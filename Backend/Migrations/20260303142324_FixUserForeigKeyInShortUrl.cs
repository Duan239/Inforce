using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class FixUserForeigKeyInShortUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShortUrls_Users_CreatedById",
                table: "ShortUrls");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "ShortUrls",
                newName: "CreatedByUserId");

            migrationBuilder.RenameIndex(
                name: "IX_ShortUrls_CreatedById",
                table: "ShortUrls",
                newName: "IX_ShortUrls_CreatedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShortUrls_Users_CreatedByUserId",
                table: "ShortUrls",
                column: "CreatedByUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShortUrls_Users_CreatedByUserId",
                table: "ShortUrls");

            migrationBuilder.RenameColumn(
                name: "CreatedByUserId",
                table: "ShortUrls",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_ShortUrls_CreatedByUserId",
                table: "ShortUrls",
                newName: "IX_ShortUrls_CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_ShortUrls_Users_CreatedById",
                table: "ShortUrls",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
