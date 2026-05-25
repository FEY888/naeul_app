import 'package:flutter/material.dart';

class ClinicGridModel {
  final String title;
  final IconData icon;
  final Color bgColor;
  final int crossAxisCount;
  final double mainAxisCount;
  final double cardHeight;

  ClinicGridModel({
    required this.title,
    required this.icon,
    required this.bgColor,
    this.crossAxisCount = 2,
    this.mainAxisCount = 1.0,
    this.cardHeight = 110.0,
  });

}