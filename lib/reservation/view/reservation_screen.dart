import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:naeul_app/common/const/colors.dart';
import 'package:naeul_app/reservation/component/feature_component.dart';
import 'package:naeul_app/reservation/data/feature_card_data.dart';
import 'package:naeul_app/reservation/utils/reservation_utils.dart';

import '../component/reservation_header.dart';

class ReservationScreen extends ConsumerWidget {
  const ReservationScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {


    final cards = ref.watch(reservationCardProvider);

    return SingleChildScrollView(
      physics: BouncingScrollPhysics(),
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ReservationHeader(title: '진료 예약',),
            const SizedBox(height: 28.0),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Container(
                width: double.infinity,
                child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('원하시는 진료를 선택해주세요.', style: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 16,
                      color: Colors.grey[800],
                    ),
                    ),
                   const SizedBox(height: 16.0,),
                    Column(
                      children: [
                        ...List.generate(cards.length, (index) {
                          final item = cards[index];

                          return Padding(
                              padding: EdgeInsets.only(bottom: 12.0),
                          child: FeatureComponent(
                              cardData: item,
                              onTap: () {
                                context.push(item.routePath);
                              },
                          ),
                          );
                        },
                        ),
                      ],
                    )
                  ],
                ),
              ),
            ),

          ],
        ),
      ),
    );
  }
}


