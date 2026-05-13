import 'package:flutter/material.dart';
import 'package:naeul_app/common/layout/default_layout.dart';
import '../home/view/home_banner.dart';
import '../home/view/home_header.dart';
import '../home/view/home_grid.dart';




class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultLayout(
      child: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: SafeArea(
              bottom: false,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Column(
                  children: const [
                    SizedBox(height: 18),
                    HomeHeader(),
                    SizedBox(height: 24),
                    HomeBanner(),
                  ],
                ),
              ),
            ),
          ),
          const HomeGrid(),
        ],
      ),

    );
  }
}
