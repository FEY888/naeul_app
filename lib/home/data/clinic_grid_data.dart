import 'package:flutter/material.dart';
import 'package:naeul_app/home/model/clinic_grid_model.dart';

// 더미 데이터임 서버 만들면 하고 imageUrl 로 대체할 예정
class ClinicGridData {
  static List<ClinicGridModel> clinicModel = [
    ClinicGridModel(
      title: '교통사고 진료',
      icon: Icons.local_shipping_outlined,
      bgColor: const Color(0xFF385E30),
      cardHeight: 220.0,
    ),
    ClinicGridModel(
        title: '린 다이어트',
        icon: Icons.local_shipping_outlined,
        bgColor: const Color(0xFF5D7A56)
    ),
    ClinicGridModel(
        title: '추나 치료',
        icon: Icons.local_shipping_outlined,
        bgColor: const Color(0xFF8BA888)
    ),
    ClinicGridModel(
        title: '척추 디스크',
        icon: Icons.local_florist_outlined,
        bgColor: const Color(0xFF4A6346)
    ),
    ClinicGridModel(
        title: '담적증후군',
        icon: Icons.people_alt_outlined,
        bgColor: const Color(0xFF2E422D),
      cardHeight: 220.0,
    ),
  ];
}