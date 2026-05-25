
extension BookingStepX on String {
  double get toBookingProgress {
    if(contains('date')) return 0.5;
    if(contains('confirm')) return 0.75;
    if(contains('success')) return 1;
    return 0.25;
  }

  String get toStepText {
    if(contains('date')) return '2 / 4';
    if(contains('confirm')) return '3 / 4';
    if(contains('success')) return '4 / 4';
    return '1 / 4';
  }
}