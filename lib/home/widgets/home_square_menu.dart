import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:naeul_app/common/const/colors.dart';
import 'package:naeul_app/home/model/square_btn_model.dart';

import '../component/square_menu_btn.dart';

class HomeGrid extends StatelessWidget {
  const HomeGrid({super.key});

  @override
  Widget build(BuildContext context) {
    // 데이터 리스트
    final List<SquareBtnModel> menus = [
      SquareBtnModel(
          title: '진료 예약',
          icon: Icons.calendar_today_outlined,
          onTap: () {
            context.go('/reservation');
          },
          isHighlight: true,
      ),
      SquareBtnModel(
        title: 'AI 문진',
        icon: Icons.assignment_outlined,
        onTap: () {},
        isHighlight: true,
      ),
      SquareBtnModel(
        title: '치료 후기',
        icon: Icons.medication_outlined,
        onTap: () {},
        isHighlight: true,
      ),
      SquareBtnModel(
        title: '전화 문의',
        icon: Icons.phone_in_talk_outlined,
        onTap: () {},
        isHighlight: true,
      ),
];

    return SliverPadding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0
        ),
      sliver: SliverGrid(
          delegate: SliverChildBuilderDelegate((context, index) {
            final menu = menus[index];
            return SquareMenuBtn(
              title: menu.title,
              icon: menu.icon,
              onTap: menu.onTap,
              color: menu.isHighlight ? const Color(0xFF2D6135) : secondaryGreen,
              
            );
          },
            childCount: menus.length,
          ),

          gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
              maxCrossAxisExtent: 115,
              crossAxisSpacing: 8,
              mainAxisSpacing:9,
            childAspectRatio: 1,
          ),
      ),
    );
  }
}
