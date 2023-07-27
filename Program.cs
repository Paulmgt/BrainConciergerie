using BrainConciergerie.Data;
using BrainConciergerie.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Appart_Api2", Version = "v1" });

});

/*builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyClient",
        builder => builder.WithOrigins("http://localhost:7021")  // Replace with the origin of your client.
                           .AllowAnyMethod());  // This allows all methods, not just POST.
});*/


builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 104857600; // Définir la limite de taille en octets (ici 100 Mo)
});



builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();





if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Appart_Api2 v1");
        c.RoutePrefix = "api/doc";
    });
}
else if (app.Environment.IsProduction())
{
    // Enable HSTS to enhance security in production
    //app.UseHsts();

    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Appart_Api2 v1");
        c.RoutePrefix = "api/doc";
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");


app.Run();
