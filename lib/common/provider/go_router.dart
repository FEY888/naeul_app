import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:naeul_app/common/layout/default_layout.dart';
import 'package:naeul_app/reservation/view/reservation_screen.dart';
import 'package:naeul_app/screen/view/home_screen.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../reservation/view/confirm_screen.dart';
import '../../reservation/view/date_select_screen.dart';
import '../../reservation/view/success_screen.dart';


part 'go_router.g.dart';

@Riverpod(
  keepAlive: true
)
GoRouter router(Ref ref) {
  return GoRouter(
    initialLocation: '/home',
    routes: [
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return DefaultLayout(
            navigationShell: navigationShell,
            child: navigationShell,
          );
        },
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/home',
                builder: (context, state) => const HomeScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/reservation',
                builder: (context, state) => const ReservationScreen(),
                routes: [
                  GoRoute(
                    path: 'date',
                    builder: (context, state) => const DateSelectScreen(),
                  ),
                  GoRoute(
                    path: 'confirm',
                    builder: (context, state) => const ConfirmScreen(),
                  ),
                  GoRoute(
                    path: 'success',
                    builder: (context, state) => const SuccessScreen(),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  );
}
