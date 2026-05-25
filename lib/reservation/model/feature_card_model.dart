import 'package:flutter/cupertino.dart';

class FeatureCardModel {

  //final String imageUrl;  나중에 이미지 url로 받아올것
  final IconData icon;
  final String title;
  final String subtitle;
  final String routePath; //클릭 시 이동할 경로

  FeatureCardModel({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.routePath,
});
}