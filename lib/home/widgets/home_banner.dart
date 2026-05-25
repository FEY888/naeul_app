import 'package:flutter/material.dart';
import 'package:naeul_app/common/const/colors.dart';

class HomeBanner extends StatelessWidget {
  const HomeBanner({super.key});

  @override
  Widget build(BuildContext context) {

    const textShadow = [
      Shadow(
          color: Color(0x33000000),
          offset: Offset(1, 1),
          blurRadius: 4
      ),
    ];
    const smallTextShadow = [
      Shadow(
        color: Color(0x33000000),
        offset: Offset(1, 1),
        blurRadius: 1,
      ),
    ];

    return Container(
      width: double.infinity,
      height: 380,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(28),
        image: DecorationImage(
          image: AssetImage('asset/img/doctor_notext.png'),
          fit: BoxFit.cover,
          alignment: Alignment.center,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            const Text('NAEUL KOREAN MEDICINE CLINIC', style: TextStyle(
              color: Colors.black54,
              fontSize: 14,
              shadows: smallTextShadow,
            ),
            ),
            const SizedBox(height: 68),
             Text.rich(
              TextSpan(
                children: [const TextSpan(text: '편안한 진료로\n', style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w500,
                ),
                ),
                 const TextSpan(text: '근본적인 건강을\n', style: TextStyle(
                    fontSize: 26,
                    color: primaryColor,
                    fontWeight: FontWeight.w700,
                    shadows: textShadow,
                  ),
                  ),
                 const TextSpan(text: '찾으세요.', style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.w500,
                  ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
