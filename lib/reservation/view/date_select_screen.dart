import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:naeul_app/common/const/colors.dart';
import 'package:naeul_app/reservation/component/reservation_header.dart';
import 'package:naeul_app/reservation/provider/date_reservation_provider.dart';
import 'package:table_calendar/table_calendar.dart';

class DateSelectScreen extends ConsumerWidget {
  const DateSelectScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selectedDate = ref.watch(selectedDateProvider);

    return Scaffold(
      backgroundColor: beigeBackground,
      body: SafeArea(
          child: Column(
            children: [
              ReservationHeader(title: '날짜 · 시간 예약',
              ),
              Expanded(

                child: SingleChildScrollView(
                  physics: BouncingScrollPhysics(),
                  child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    child: Column(
                      children: [
                        TableCalendar(
                          focusedDay: selectedDate ?? DateTime.now(),
                          firstDay: DateTime.now(),
                          lastDay: DateTime.now().add(const Duration(days: 60),
                          ),
                          locale: 'ko_KR',
                          selectedDayPredicate: (day) => isSameDay(selectedDate, day),
                          onDaySelected: (selectedDay, focusedDay) {
                            ref.read(selectedDateProvider.notifier).selectDate(selectedDay);
                          },
                          headerStyle: const HeaderStyle(
                            formatButtonVisible: false,
                            titleCentered: true,
                            titleTextStyle: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w700,
                              color: Colors.black,

                            ),

                          ),
                        ),
                      ],
                    )
                  ),
                ),
              ),
            ],
          ),
      ),
    );
  }
}
