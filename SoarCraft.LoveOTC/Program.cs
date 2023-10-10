using MessagePack;
using MessagePack.Resolvers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using SoarCraft.LoveOTC;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(x => x.AddServerHeader = false);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, x => {
        x.Authority = "https://keycloak.eco.tsi-dev.otc-service.com/realms/eco";
        x.Audience = "LoveOTC";
        x.Events.OnMessageReceived = c => {
            string? token = c.Request.Query["access_token"];
            if (!string.IsNullOrWhiteSpace(token)) {
                c.Token = token;
            }
            return Task.CompletedTask;
        };
    });

builder.Services.AddSignalR(x => {
    x.HandshakeTimeout = TimeSpan.FromSeconds(5);
    x.SupportedProtocols = new[] { "messagepack" };
    x.EnableDetailedErrors = Shared.Dev;
}).AddMessagePackProtocol(x => {
    x.SerializerOptions = MessagePackSerializerOptions.Standard
        .WithSecurity(MessagePackSecurity.UntrustedData)
        .WithResolver(ContractlessStandardResolverAllowPrivate.Instance);
});

var app = builder.Build();

if (Shared.Dev) {
    app.UseDeveloperExceptionPage();

    app.UseHttpsRedirection();
    app.UseHsts();
}

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.UseWebSockets();

app.MapFallbackToFile("index.html");

app.Run();
