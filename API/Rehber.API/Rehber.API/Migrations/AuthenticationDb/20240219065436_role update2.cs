using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rehber.API.Migrations.AuthenticationDb
{
    /// <inheritdoc />
    public partial class roleupdate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2b62112c-3386-45e1-9dee-5beeaf31b9eb", "2b62112c-3386-45e1-9dee-5beeaf31b9eb", "adminRole", "ADMINROLE" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4795ef64-44c4-434e-8f6a-3d614bb9373a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d71be29b-2888-4a81-bccc-b34b895a7531", "AQAAAAIAAYagAAAAENE+6oQ2ptAxJvlnYyST3veWOHmpGqRPhcjFIuVKcP9qpWMQZXUU3U+KLdfQ6jXNgQ==", "1a1fae67-0883-42ca-87bb-5a805ed5468d" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "2b62112c-3386-45e1-9dee-5beeaf31b9eb", "4795ef64-44c4-434e-8f6a-3d614bb9373a" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "2b62112c-3386-45e1-9dee-5beeaf31b9eb", "4795ef64-44c4-434e-8f6a-3d614bb9373a" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2b62112c-3386-45e1-9dee-5beeaf31b9eb");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4795ef64-44c4-434e-8f6a-3d614bb9373a",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c55c0ab4-9770-4429-b517-30313182fd01", "AQAAAAIAAYagAAAAELaS2BpopmIAMbmNk06sP6r3Tp7xVxoMQTpEjfZ6frA0c8nLGSLGwuCa5r6iJEzzDA==", "ab36b6ab-a5f1-40fb-86eb-2c9113ef4f80" });
        }
    }
}
