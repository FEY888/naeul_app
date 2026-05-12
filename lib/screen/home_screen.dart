import 'package:flutter/material.dart';
import 'package:naeul_app/common/layout/default_layout.dart';
import 'package:naeul_app/home_component/home_banner.dart';
import '../home_component/home_header.dart';



class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {


    return DefaultLayout(
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Column(
              children: [
                const SizedBox(height: 18),
                const HomeHeader(),
                const SizedBox(height: 24,),
                const HomeBanner(),
              ],
            ),
          ),
        ) ,
    );
  }
}
