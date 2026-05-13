import 'package:flutter/material.dart';

import '../component/square_menu_btn.dart';

class HomeGrid extends StatelessWidget {
  const HomeGrid({super.key});

  @override
  Widget build(BuildContext context) {
    // 데이터 리스트
    final List<Map<String, dynamic>> menus = [
      {'icon' : Icons.calendar_today_outlined, 'label': '진료 예약'},
      {'icon' : Icons.assignment_outlined, 'label': 'AI 문진'},
      {'icon' : Icons.medication_outlined, 'label': '치료 후기'},
      {'icon' : Icons.phone_in_talk_outlined, 'label': '전화 문의'},

];

    return SliverPadding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0
        ),
      sliver: SliverGrid(
          delegate: SliverChildBuilderDelegate((context, index) {
            final menu = menus[index];
            return SquareMenuBtn(
              title: menu['label'],
              icon: menu['icon'],
              onTap: () {

              },
            );
          },
            childCount: menus.length,
          ),

          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 4,
              mainAxisSpacing: 8,
              crossAxisSpacing: 8,
              childAspectRatio: 1
          ),
      ),
    );
  }
}
