using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BrainConciergerie.Migrations
{
    /// <inheritdoc />
    public partial class migrationInitiale : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Apparts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Localisation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Poubelles = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Transports = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Consignes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Parking = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Apparts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NotationAppartDTO",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomClient = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Commentaire = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppartementId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotationAppartDTO", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AutresActivites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Localisation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppartId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutresActivites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AutresActivites_Apparts_AppartId",
                        column: x => x.AppartId,
                        principalTable: "Apparts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Bars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Localisation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppartId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bars", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bars_Apparts_AppartId",
                        column: x => x.AppartId,
                        principalTable: "Apparts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Cinemas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Localisation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppartId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cinemas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cinemas_Apparts_AppartId",
                        column: x => x.AppartId,
                        principalTable: "Apparts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Equipements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantite = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppartId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Equipements_Apparts_AppartId",
                        column: x => x.AppartId,
                        principalTable: "Apparts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Monuments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Localisation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppartId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Monuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Monuments_Apparts_AppartId",
                        column: x => x.AppartId,
                        principalTable: "Apparts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "NotationsAppart",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomClient = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Commentaire = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppartId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotationsAppart", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NotationsAppart_Apparts_AppartId",
                        column: x => x.AppartId,
                        principalTable: "Apparts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhotoFile = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    AppartId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_Apparts_AppartId",
                        column: x => x.AppartId,
                        principalTable: "Apparts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Restaurants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Localisation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppartId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restaurants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Restaurants_Apparts_AppartId",
                        column: x => x.AppartId,
                        principalTable: "Apparts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AutresActivites_AppartId",
                table: "AutresActivites",
                column: "AppartId");

            migrationBuilder.CreateIndex(
                name: "IX_Bars_AppartId",
                table: "Bars",
                column: "AppartId");

            migrationBuilder.CreateIndex(
                name: "IX_Cinemas_AppartId",
                table: "Cinemas",
                column: "AppartId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipements_AppartId",
                table: "Equipements",
                column: "AppartId");

            migrationBuilder.CreateIndex(
                name: "IX_Monuments_AppartId",
                table: "Monuments",
                column: "AppartId");

            migrationBuilder.CreateIndex(
                name: "IX_NotationsAppart_AppartId",
                table: "NotationsAppart",
                column: "AppartId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_AppartId",
                table: "Photos",
                column: "AppartId");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_AppartId",
                table: "Restaurants",
                column: "AppartId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AutresActivites");

            migrationBuilder.DropTable(
                name: "Bars");

            migrationBuilder.DropTable(
                name: "Cinemas");

            migrationBuilder.DropTable(
                name: "Equipements");

            migrationBuilder.DropTable(
                name: "Monuments");

            migrationBuilder.DropTable(
                name: "NotationAppartDTO");

            migrationBuilder.DropTable(
                name: "NotationsAppart");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "Restaurants");

            migrationBuilder.DropTable(
                name: "Apparts");
        }
    }
}
