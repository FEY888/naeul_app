import 'package:flutter/material.dart';
import 'package:naeul_app/reservation/model/feature_card_model.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'feature_card_data.g.dart';

// 서버 만들면 삭제할 것
@riverpod
List<FeatureCardModel> reservationCard(ReservationCardRef ref) {
  return [
    FeatureCardModel(
        icon: Icons.car_crash,
        title: '교통사고 진료',
        subtitle: '자동차보험진료, 후유증 치료',
        routePath: '/reservation/date'
    ),
    FeatureCardModel(
        icon: Icons.local_shipping_outlined,
        title: '담적병 치료',
        subtitle: '소화 불량, 복부 불편감',
        routePath: '/reservation/date'
    ),
    FeatureCardModel(
        icon: Icons.directions_train_outlined,
        title: '다이어트 상담',
        subtitle: '체질 상담과 다이어트 관리 프로그램',
        routePath: '/reservation/date'
    ),
    FeatureCardModel(
        icon: Icons.record_voice_over_outlined,
        title: '통증 치료',
        subtitle: '허리, 목, 어깨, 관절 집중 치료',
        routePath: '/reservation/date'
    ),
    FeatureCardModel(
        icon: Icons.person_outlined,
        title: '여성질환, 갱년기',
        subtitle: '갱년기 관리, 태반 약침',
        routePath: '/reservation/date'
    ),
  ];
}