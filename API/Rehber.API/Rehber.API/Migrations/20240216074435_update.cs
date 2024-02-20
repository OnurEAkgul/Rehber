using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rehber.API.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_rehberIcerikleri_userIcerikleri_userIcerikuserId",
                table: "rehberIcerikleri");

            migrationBuilder.DropIndex(
                name: "IX_rehberIcerikleri_userIcerikuserId",
                table: "rehberIcerikleri");

            migrationBuilder.DropColumn(
                name: "userIcerikuserId",
                table: "rehberIcerikleri");

            migrationBuilder.CreateIndex(
                name: "IX_rehberIcerikleri_userId",
                table: "rehberIcerikleri",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_rehberIcerikleri_userIcerikleri_userId",
                table: "rehberIcerikleri",
                column: "userId",
                principalTable: "userIcerikleri",
                principalColumn: "userId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_rehberIcerikleri_userIcerikleri_userId",
                table: "rehberIcerikleri");

            migrationBuilder.DropIndex(
                name: "IX_rehberIcerikleri_userId",
                table: "rehberIcerikleri");

            migrationBuilder.AddColumn<Guid>(
                name: "userIcerikuserId",
                table: "rehberIcerikleri",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_rehberIcerikleri_userIcerikuserId",
                table: "rehberIcerikleri",
                column: "userIcerikuserId");

            migrationBuilder.AddForeignKey(
                name: "FK_rehberIcerikleri_userIcerikleri_userIcerikuserId",
                table: "rehberIcerikleri",
                column: "userIcerikuserId",
                principalTable: "userIcerikleri",
                principalColumn: "userId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
