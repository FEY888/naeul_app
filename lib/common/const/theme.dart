
import 'package:flutter/material.dart';

const customTextTheme = TextTheme(
  headlineMedium: TextStyle(
    fontWeight: FontWeight.w700,
    color: Colors.black87,
    fontSize: 20,
  ),
  titleMedium: TextStyle(
    fontWeight: FontWeight.w500,
    fontSize: 16,
    color: Colors.black,
  ),
  bodyLarge: TextStyle(
    fontSize: 16,
    color: Colors.black54,
  ),
);

final customAppTheme = ThemeData(
  useMaterial3: true,
  colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF006A60),
  brightness: Brightness.light,
  ),
  textTheme: customTextTheme,
);