using MessagePack;
using MessagePack.Resolvers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.EntityFrameworkCore;
using TSystems.LoveOTC;
using TSystems.LoveOTC.AdminHub;
using TSystems.LoveOTC.Hub;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(x => x.AddServerHeader = false);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, x => {
        x.Authority = Shared.Dev ? "http://localhost:8080/realms/loveotc" : "https://keycloak.eco.tsi-dev.otc-service.com/realms/eco";
        x.Audience = "account";
        x.RequireHttpsMetadata = !Shared.Dev;
        x.Events = new() {
            OnMessageReceived = c => {
                string? token = c.Request.Query["access_token"];
                if (!string.IsNullOrWhiteSpace(token)) c.Token = token;
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddDbContext<ShopContext>(x => {
    if (Shared.Dev) {
        x.EnableSensitiveDataLogging();
        x.EnableDetailedErrors();
    }
    x.UseLazyLoadingProxies();
    x.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

if (Shared.Dev)
    builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddSignalR(x => {
    x.HandshakeTimeout = TimeSpan.FromSeconds(5);
    x.SupportedProtocols = new[] { "messagepack" };
    x.EnableDetailedErrors = Shared.Dev;
    x.MaximumParallelInvocationsPerClient = 9;
}).AddMessagePackProtocol(x => {
    x.SerializerOptions = MessagePackSerializerOptions.Standard
        .WithSecurity(MessagePackSecurity.UntrustedData)
        .WithResolver(ContractlessStandardResolverAllowPrivate.Instance);
});

builder.Host.UseSystemd();

var app = builder.Build();

if (Shared.Dev) {
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}

app.UseHttpsRedirection();

app.UseHsts();

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.UseWebSockets();

app.MapHub<ShopHub>("/Hub", x => x.Transports = HttpTransportType.WebSockets);

app.MapHub<AdminHub>("/AdminHub", x => x.Transports = HttpTransportType.WebSockets);

app.MapFallbackToFile("index.html");

app.Run();
