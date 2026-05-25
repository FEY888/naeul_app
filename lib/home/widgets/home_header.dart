import 'package:flutter/material.dart';
import 'package:naeul_app/common/const/colors.dart';


class HomeHeader extends StatelessWidget {
  const HomeHeader({super.key});

  @override
  Widget build(BuildContext context) {
   final textTheme = Theme.of(context).textTheme;

    return Row(
      children: [
        Icon(
          Icons.local_hospital,
          color: secondaryGreen,
          size: 30,
        ),
        const SizedBox(width: 8.0,),
        Expanded(
          child: Text('나을 한의원',
          style: textTheme.headlineMedium?.copyWith(
            color: primaryColor,
            fontSize: 29,
          ),
          ),
        ),
        _CircleBtn(
          onPressed: () {

          },
        ),
      ],
    );
  }
}

class _CircleBtn extends StatelessWidget {
  final VoidCallback? onPressed;

  const _CircleBtn({
    required this.onPressed,
    super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 40,
      height: 40,
      decoration: BoxDecoration(
        color: Colors.white,
        shape: BoxShape.circle,
        border: Border.all(color: const Color(0xFFE0DDD5),),
      ),
      child: IconButton(
        onPressed: onPressed,
        icon: Icon(Icons.notifications_outlined,
        color: secondaryGreen,
        ),
        padding: EdgeInsets.zero,
        constraints: BoxConstraints(),
      ),
    );
  }
}
