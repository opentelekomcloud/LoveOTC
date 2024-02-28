namespace TSystems.LoveOTC.AdminHub;

using System.Collections.Immutable;
using System.Text;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

internal partial class AdminHub {
    private static DateTime lastExport = DateTime.MinValue;

    private static readonly IImmutableList<string> headers = new[] {
        "Order ID",
        "Order Date",
        "Product",
        "Types",
        "Quantity",
        "Status",
        "TrackingNumber",
        "Recipient Name",
        "E-Mail",
        "Phone",
        "Address",
        "Comments"
    }.ToImmutableArray();

    /**
     * <remarks>
     * @author Aloento
     * @since 1.2.0
     * @version 1.1.0
     * </remarks>
     */
    public async IAsyncEnumerable<byte[]> ExportOrder() {
        if (DateTime.Now - lastExport < TimeSpan.FromMinutes(3))
            throw new HubException("The time interval between two exports shall not be less than 3 minutes.");

        lastExport = DateTime.Now;

        using var stream = new MemoryStream();
        using var document = SpreadsheetDocument.Create(stream, SpreadsheetDocumentType.Workbook, true);

        var workbookPart = document.AddWorkbookPart();
        workbookPart.Workbook = new();

        var worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
        var sheetData = new SheetData();
        worksheetPart.Worksheet = new(sheetData);

        var sheets = workbookPart.Workbook.AppendChild(new Sheets());
        var sheet = new Sheet {
            Id = workbookPart.GetIdOfPart(worksheetPart),
            SheetId = 1,
            Name = "AllOrders"
        };
        sheets.Append(sheet);

        var cells = new List<Cell>(7) {
            new() {
                DataType = CellValues.String,
                CellValue = new(Shared.App)
            }
        };

        for (var i = 0; i < 5; i++)
            cells.Add(new() {
                DataType = CellValues.String,
                CellValue = new(" ")
            });

        cells.Add(new() {
            DataType = CellValues.String,
            CellValue = new($"This order sheet was exported on {DateTime.Now:yyyy-MM-dd HH:mm}")
        });

        var timestamp = new Row();
        sheetData.AppendChild(timestamp);
        timestamp.Append(cells);

        var divider = new Row();
        sheetData.AppendChild(divider);
        divider.Append(new Cell {
            DataType = CellValues.String,
            CellValue = new(" ")
        });

        var headerRow = new Row();
        sheetData.AppendChild(headerRow);
        headerRow.Append(headers.Select(x => new Cell {
            DataType = CellValues.String,
            CellValue = new(x)
        }));

        var userIds = await this.Db.Orders
            .Select(x => x.UserId)
            .Distinct()
            .ToArrayAsync();

        var sharedStringTablePart = workbookPart.GetPartsOfType<SharedStringTablePart>().Any()
            ? workbookPart.GetPartsOfType<SharedStringTablePart>().First()
            : workbookPart.AddNewPart<SharedStringTablePart>();

        sharedStringTablePart.SharedStringTable ??= new();

        foreach (var userId in userIds) {
            var records = this.Db.OrderCombos
                .Where(x => x.Order.UserId == userId)
                .Include(x => x.Order)
                .ThenInclude(o => o.User)
                .Include(x => x.Order)
                .ThenInclude(o => o.Comments)
                .ThenInclude(c => c.User)
                .Include(x => x.Combo)
                .ThenInclude(c => c.Product)
                .Include(x => x.Combo)
                .ThenInclude(c => c.Types)
                .ThenInclude(t => t.Variant)
                .OrderByDescending(x => x.OrderId)
                .AsAsyncEnumerable();

            var prevId = 0u;

            await foreach (var record in records) {
                var order = record.Order;
                var user = order.User;
                var combo = record.Combo;
                var currId = order.OrderId;

                var data = new List<Cell>(12) {
                    new() {
                        DataType = CellValues.Number,
                        CellValue = new((decimal)currId)
                    },
                    new() {
                        DataType = CellValues.String,
                        CellValue = new(order.CreateAt.ToString("yyyy-MM-dd HH:mm"))
                    },
                    new() {
                        DataType = CellValues.SharedString,
                        CellValue = new(shared(combo.Product.Name))
                    }
                };

                var types = combo.Types.Aggregate(
                        new StringBuilder(),
                        (prev, curr) => {
                            prev.Append(curr.Variant.Name);
                            prev.Append(" : ");
                            prev.Append(curr.Name);
                            prev.Append(" ; ");
                            return prev;
                        })
                    .ToString();

                data.AddRange([
                    new() {
                        DataType = CellValues.String,
                        CellValue = new(types)
                    },
                    new() {
                        DataType = CellValues.Number,
                        CellValue = new((decimal)record.Quantity)
                    },
                    new() {
                        DataType = CellValues.SharedString,
                        CellValue = new(shared(order.Status.ToString()))
                    }
                ]);

                data.Add(string.IsNullOrWhiteSpace(order.TrackingNumber)
                    ? new Cell {
                        DataType = CellValues.String,
                        CellValue = new("/")
                    }
                    : new() {
                        DataType = CellValues.SharedString,
                        CellValue = new(shared(order.TrackingNumber))
                    });

                data.AddRange([
                    new() {
                        DataType = CellValues.SharedString,
                        CellValue = new(shared(user.Name))
                    },
                    new() {
                        DataType = CellValues.SharedString,
                        CellValue = new(shared(user.EMail))
                    },
                    new() {
                        DataType = CellValues.SharedString,
                        CellValue = new(shared(user.Phone))
                    },
                    new() {
                        DataType = CellValues.SharedString,
                        CellValue = new(shared(user.Address))
                    }
                ]);

                if (prevId != currId) {
                    var cmts = order.Comments
                        .OrderBy(x => x.CreateAt)
                        .Aggregate(
                            new StringBuilder(),
                            (prev, curr) => {
                                prev.Append('[');
                                prev.Append(curr.CreateAt.ToString("yyyy-MM-dd HH:mm"));
                                prev.Append("] : ");
                                prev.AppendLine(curr.User?.Name ?? "User");
                                prev.AppendLine(curr.Content);

                                return prev;
                            })
                        .ToString();

                    data.Add(new() {
                        DataType = CellValues.String,
                        CellValue = new(cmts)
                    });
                } else
                    data.Add(new() {
                        DataType = CellValues.String,
                        CellValue = new("-")
                    });

                var row = new Row();
                sheetData.AppendChild(row);
                row.Append(data);

                prevId = currId;
            }
        }

        workbookPart.Workbook.Save();
        document.Save();
        stream.Position = 0;

        var buffer = new byte[30 * 1024];
        int bytesRead;

        while ((bytesRead = await stream.ReadAsync(buffer)) > 0)
            yield return buffer[..bytesRead];

        yield break;

        int shared(string text) {
            var i = 0;
            var table = sharedStringTablePart.SharedStringTable;

            foreach (var item in table.Elements<SharedStringItem>()) {
                if (item.InnerText == text)
                    return i;

                i++;
            }

            table.AppendChild(new SharedStringItem(new Text(text)));
            table.Save();

            return i;
        }
    }
}
