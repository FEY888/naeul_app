import 'package:flutter/material.dart';

class SquareBtnModel {
  final String title;
  final IconData icon;
  final VoidCallback onTap;
  final bool isHighlight;

  SquareBtnModel({
    required this.title,
    required this.icon,
    required this.onTap,
    this.isHighlight = false
});
}