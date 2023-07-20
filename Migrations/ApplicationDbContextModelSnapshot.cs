﻿// <auto-generated />
using System;
using BrainConciergerie.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BrainConciergerie.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BrainConciergerie.Models.Appart", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Consignes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Localisation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Parking")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Poubelles")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Transports")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Appartements");
                });

            modelBuilder.Entity("BrainConciergerie.Models.AutresActivites", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AppartementId")
                        .HasColumnType("int");

                    b.Property<int?>("AppartsId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Localisation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AppartementId");

                    b.ToTable("AutresActivites");
                });

            modelBuilder.Entity("BrainConciergerie.Models.Bars", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AppartementId")
                        .HasColumnType("int");

                    b.Property<int?>("AppartsId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Localisation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AppartementId");

                    b.ToTable("Bars");
                });

            modelBuilder.Entity("BrainConciergerie.Models.Cinema", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AppartementId")
                        .HasColumnType("int");

                    b.Property<int?>("AppartsId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Localisation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AppartementId");

                    b.ToTable("Cinema");
                });

            modelBuilder.Entity("BrainConciergerie.Models.Equipements", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AppartementId")
                        .HasColumnType("int");

                    b.Property<int?>("AppartsId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Quantite")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AppartementId");

                    b.ToTable("Equipements");
                });

            modelBuilder.Entity("BrainConciergerie.Models.Monuments", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AppartementId")
                        .HasColumnType("int");

                    b.Property<int?>("AppartsId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Localisation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AppartementId");

                    b.ToTable("Monuments");
                });

            modelBuilder.Entity("BrainConciergerie.Models.Photos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AppartementId")
                        .HasColumnType("int");

                    b.Property<int?>("AppartsId")
                        .HasColumnType("int");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PhotoFile")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("Id");

                    b.HasIndex("AppartementId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("BrainConciergerie.Models.Restaurants", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AppartementId")
                        .HasColumnType("int");

                    b.Property<int?>("AppartsId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Localisation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AppartementId");

                    b.ToTable("Restaurants");
                });

            modelBuilder.Entity("BrainConciergerie.Models.AutresActivites", b =>
                {
                    b.HasOne("BrainConciergerie.Models.Appart", "Appartement")
                        .WithMany("AutresActivites")
                        .HasForeignKey("AppartementId");

                    b.Navigation("Appartement");
                });

            modelBuilder.Entity("BrainConciergerie.Models.Bars", b =>
                {
                    b.HasOne("BrainConciergerie.Models.Appart", "Appartement")
                        .WithMany("Bar")
                        .HasForeignKey("AppartementId");

                    b.Navigation("Appartement");
                });

            modelBuilder.Entity("BrainConciergerie.Models.Cinema", b =>
                {
                    b.HasOne("BrainConciergerie.Models.Appart", "Appartement")
                        .WithMany("Cinema")
                        .HasForeignKey("AppartementId");

                    b.Navigation("Appartement");
                });

            modelBuilder.Entity("BrainConciergerie.Models.Equipements", b =>
                {
                    b.HasOne("BrainConciergerie.Models.Appart", "Appartement")
                        .WithMany("Equipements")
                        .HasForeignKey("AppartementId");

                    b.Navigation("Appartement");
                });

            modelBuilder.Entity("BrainConciergerie.Models.Monuments", b =>
                {
                    b.HasOne("BrainConciergerie.Models.Appart", "Appartement")
                        .WithMany("Monuments")
                        .HasForeignKey("AppartementId");

                    b.Navigation("Appartement");
                });

            modelBuilder.Entity("BrainConciergerie.Models.Photos", b =>
                {
                    b.HasOne("BrainConciergerie.Models.Appart", "Appartement")
                        .WithMany("Photos")
                        .HasForeignKey("AppartementId");

                    b.Navigation("Appartement");
                });

            modelBuilder.Entity("BrainConciergerie.Models.Restaurants", b =>
                {
                    b.HasOne("BrainConciergerie.Models.Appart", "Appartement")
                        .WithMany("Restaurants")
                        .HasForeignKey("AppartementId");

                    b.Navigation("Appartement");
                });

            modelBuilder.Entity("BrainConciergerie.Models.Appart", b =>
                {
                    b.Navigation("AutresActivites");

                    b.Navigation("Bar");

                    b.Navigation("Cinema");

                    b.Navigation("Equipements");

                    b.Navigation("Monuments");

                    b.Navigation("Photos");

                    b.Navigation("Restaurants");
                });
#pragma warning restore 612, 618
        }
    }
}
