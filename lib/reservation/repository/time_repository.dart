
import 'package:naeul_app/reservation/model/time_slot.dart';

abstract class TimeRepository {
  Future<List<TimeSlot>> getAvailableSlots(DateTime date);
}