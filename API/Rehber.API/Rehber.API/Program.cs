using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Rehber.API.Data;
using Rehber.API.Repositories.Implementation;
using Rehber.API.Repositories.Interface;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("RehberConnectionString"));
});

builder.Services.AddScoped<InterfaceRehberRepository, RehberRepository>();  

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseCors(Options =>
{
    Options.AllowAnyHeader();
    Options.AllowAnyOrigin();
    Options.AllowAnyMethod();
});

app.UseAuthorization();

app.MapControllers();

app.Run();
