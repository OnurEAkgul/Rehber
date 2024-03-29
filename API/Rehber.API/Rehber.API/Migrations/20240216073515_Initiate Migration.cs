﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rehber.API.Migrations
{
    /// <inheritdoc />
    public partial class InitiateMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "userIcerikleri",
                columns: table => new
                {
                    userId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    userName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    userPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    userEmail = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userIcerikleri", x => x.userId);
                });

            migrationBuilder.CreateTable(
                name: "rehberIcerikleri",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    userId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    userIcerikuserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rehberIcerikleri", x => x.id);
                    table.ForeignKey(
                        name: "FK_rehberIcerikleri_userIcerikleri_userIcerikuserId",
                        column: x => x.userIcerikuserId,
                        principalTable: "userIcerikleri",
                        principalColumn: "userId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_rehberIcerikleri_userIcerikuserId",
                table: "rehberIcerikleri",
                column: "userIcerikuserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "rehberIcerikleri");

            migrationBuilder.DropTable(
                name: "userIcerikleri");
        }
    }
}
