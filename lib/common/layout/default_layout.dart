import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:naeul_app/common/const/colors.dart';

class DefaultLayout extends StatelessWidget {
  final Color? backgroundColor;
  final Widget child;
  final String? title;
  final StatefulNavigationShell? navigationShell;

  const DefaultLayout({
    required this.child,
    this.navigationShell,
    this.title,
    this.backgroundColor,
    super.key,});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: backgroundColor ?? beigeBackground,
      appBar: renderAppBar(),
      body: child,
      bottomNavigationBar: navigationShell != null ?
          NavigationBar(
            selectedIndex: navigationShell!.currentIndex,
            onDestinationSelected: (index) {
              navigationShell!.goBranch(index);
            },
            destinations: const [
              NavigationDestination(
                  icon: Icon(Icons.home_outlined),
                  label: '홈'
              ),
              NavigationDestination(
                  icon: Icon(Icons.calendar_month_outlined),
                  label: '예약 관리'
              ),
              NavigationDestination(
                  icon: Icon(Icons.search_outlined),
                  label: '진료 정보'
              ),
              NavigationDestination(
                  icon: Icon(Icons.person_outlined),
                  label: '마이페이지',
              ),
            ],
          )
          : null,
    );
  }

  AppBar? renderAppBar() {
    if(title ==  null) {
      return null;
    }else {
      return AppBar(
        backgroundColor: beigeBackground,
        elevation: 0,
        title: Text(title!,
        style: TextStyle(
          fontSize: 16.0,
          fontWeight: FontWeight.w500,
        ),
        ),
      );
    }
  }
}
