
import 'package:naeul_app/reservation/repository/time_repository.dart';

import '../model/time_slot.dart';

class TimeMockRepository implements TimeRepository{

  Future<List<TimeSlot>> getAvailableSlots(DateTime date) async {
    await Future.delayed(const Duration(seconds: 800));

    return [
      TimeSlot(time: DateTime(date.year, date.month, date.day, 10, 0), isAvailable: true),
      TimeSlot(time: DateTime(date.year, date.month, date.day, 16, 30), isAvailable: false),

    ];
  }
}