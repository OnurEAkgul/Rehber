using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
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

builder.Services.AddDbContext<AuthenticationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("RehberConnectionString"));
});

builder.Services.AddScoped<InterfaceRehberRepository, RehberRepository>(); 
builder.Services.AddScoped<InterfaceUserRepository, UserRepository>();
builder.Services.AddScoped<InterfaceTokenRepository, TokenRepository>();


builder.Services.AddIdentityCore<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>("Rehber")
    .AddEntityFrameworkStores<AuthenticationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength= 5;
    options.Password.RequiredUniqueChars = 0;
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            AuthenticationType="Jwt",
            ValidateIssuer=true,
            ValidateAudience=true,
            ValidateLifetime=true,
            ValidateIssuerSigningKey=true,
            ValidIssuer= builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = 
            new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
