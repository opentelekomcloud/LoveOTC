namespace TSystems.LoveOTC.AdminHub;

using System.Collections.Immutable;
using System.Text;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Entities;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

internal partial class AdminHub {
    private static DateTime lastExport = DateTime.MinValue;

    private static readonly IImmutableList<string> headers = new[] {
        "Order Id",
        "Order Time",
        "Recipient Name",
        "E-Mail",
        "Phone",
        "Address",
        "Product Name",
        "Types",
        "Quantity"
    }.ToImmutableArray();

    /**
     * <remarks>
     * @author Aloento
     * @since 1.2.0
     * @version 0.1.0
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
            Name = "ProcessingOrder"
        };
        sheets.Append(sheet);

        var headerRow = new Row();
        _ = sheetData.AppendChild(headerRow);
        headerRow.Append(headers.Select(x => new Cell {
            DataType = CellValues.String,
            CellValue = new(x)
        }));

        var userIds = await this.Db.Orders
            .Where(x => x.Status == OrderStatus.Processing)
            .Select(x => x.UserId)
            .Distinct()
            .ToArrayAsync();

        foreach (var userId in userIds) {
            var records = this.Db.OrderCombos
                .Where(x => x.Order.UserId == userId)
                .Where(x => x.Order.Status == OrderStatus.Processing)
                .Include(x => x.Order)
                .ThenInclude(o => o.User)
                .Include(x => x.Combo)
                .ThenInclude(c => c.Product)
                .Include(x => x.Combo)
                .ThenInclude(c => c.Types)
                .ThenInclude(t => t.Variant)
                .AsAsyncEnumerable();

            var first = true;
            await foreach (var record in records) {
                var order = record.Order;
                var user = order.User;
                var combo = record.Combo;

                var data = new List<string>(9) {
                    record.OrderId.ToString(),
                    order.CreateAt.ToString("yyyy-MM-dd HH:mm:ss"),
                    user.Name
                };

                if (first) {
                    data.AddRange([
                        user.EMail,
                        user.Phone,
                        user.Address
                    ]);
                    first = false;
                } else
                    data.AddRange([
                        "-", "-", "-"
                    ]);

                data.Add(combo.Product.Name);

                var types = combo.Types.Aggregate(
                        new StringBuilder(),
                        (prev, curr) => {
                            _ = prev.Append(curr.Variant.Name);
                            _ = prev.Append(" : ");
                            _ = prev.Append(curr.Name);
                            _ = prev.Append(" ; ");
                            return prev;
                        })
                    .ToString();

                data.AddRange([
                    types,
                    record.Quantity.ToString()
                ]);

                var row = new Row();
                _ = sheetData.AppendChild(row);
                row.Append(data.Select(x => new Cell {
                    DataType = CellValues.String,
                    CellValue = new(x)
                }));
            }

            var emptyRow = new Row();
            _ = sheetData.AppendChild(emptyRow);
        }

        workbookPart.Workbook.Save();
        document.Save();
        stream.Position = 0;

        var buffer = new byte[30 * 1024];
        int bytesRead;

        while ((bytesRead = await stream.ReadAsync(buffer)) > 0)
            yield return buffer[..bytesRead];
    }
}
