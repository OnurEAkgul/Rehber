using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rehber.API.Migrations.AuthenticationDb
{
    /// <inheritdoc />
    public partial class roleupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4795ef64-44c4-434e-8f6a-3d614bb9373a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c55c0ab4-9770-4429-b517-30313182fd01", "AQAAAAIAAYagAAAAELaS2BpopmIAMbmNk06sP6r3Tp7xVxoMQTpEjfZ6frA0c8nLGSLGwuCa5r6iJEzzDA==", "ab36b6ab-a5f1-40fb-86eb-2c9113ef4f80" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4795ef64-44c4-434e-8f6a-3d614bb9373a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fb7dd7c5-63d2-4532-8dea-46f72b06c522", "AQAAAAIAAYagAAAAEC2CSRFqEz/C5t5vzW13ZhzbsN9npvO/K/hPH7Bp1TKJ9pD0YTr5KFg13zdTohkAQA==", "842c97ba-1ea8-42c2-b4b4-5cadefe6e14f" });
        }
    }
}
