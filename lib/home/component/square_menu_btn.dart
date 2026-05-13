import 'package:flutter/material.dart';

class SquareMenuBtn extends StatelessWidget {
  final String title;
  final IconData icon;
  final VoidCallback onTap;
  final Color? color;

  const SquareMenuBtn({
    required this.title,
    required this.icon,
    required this.onTap,
    this.color,

    super.key,});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(24),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ]
        ),
        child: Padding(
            padding: EdgeInsets.symmetric(vertical: 16.0, horizontal: 8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(title, style: TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w600,
                color: Colors.black87,
              ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 5,),
              Icon(
                icon,
                size: 26,
                color: color ?? const Color(0xFF2D6135),
                  ),
            ],
          ),
        ),
      ),
    );
  }
}
