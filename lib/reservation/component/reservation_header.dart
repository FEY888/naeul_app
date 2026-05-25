import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../common/const/colors.dart';
import '../utils/reservation_utils.dart';

class ReservationHeader extends StatelessWidget {
  final String title;

  const ReservationHeader({
    required this.title,
    super.key});

  @override
  Widget build(BuildContext context) {
    final String location = GoRouterState.of(context).matchedLocation;
    /// extension get 가져오기
    final double progress = location.toBookingProgress;
    final String stepText = location.toStepText;

    return Container(
      width: double.infinity,
      height: 170,
      decoration: BoxDecoration(
        color: primaryColor,
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24.0,vertical: 20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Text('나을 한의원', style: TextStyle(
            //   fontSize: 20,
            //   color: Colors.grey[200],
            // ),
            // ),
            Text(title, style: TextStyle(
              fontSize: 30,
              color: Colors.white,
              fontWeight: FontWeight.w700,
            ),
            ),
            // Text('어떤 진료를 받으시겠습니까?', style: TextStyle(
            //   fontSize: 17,
            //   color: Colors.grey[100],
            // ),
            // ),
            const SizedBox(height: 12,),
            Stack(
              children: [
                Container(
                  width: 150,
                  height: 4,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(2),
                  ),

                ),
                AnimatedContainer(duration: const Duration(milliseconds: 300),
                  width: 150 * progress,
                  height: 4,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),

              ],
            ),
            const SizedBox(height: 12,),
            Text(
              stepText,
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
