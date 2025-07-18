<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title><?php echo e($subjectText); ?></title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #2c3e50; padding: 20px; color: #ffffff; text-align: center;">
         
                         <img src="<?php echo e(asset('logo.png')); ?>" style="height: 100px; width: 100px;" />
                            <p style="margin: 5px 0 0;">Your Comfort, Our Priority</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="margin-top: 0;">Hello!</h2>
                            <p style="font-size: 16px; line-height: 1.5; color: #333333;">
                                <?php echo $bodyMessage; ?>

                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td
                            style="background-color: #ecf0f1; padding: 20px; text-align: center; font-size: 14px; color: #555555;">
                            <p style="margin: 0;"><strong><?php echo e($settingData->name); ?></strong></p>
                            <p style="margin: 5px 0;">
                                Email:
                                <a href="mailto:<?php echo e($settingData->email); ?>" style="color: #2c3e50;">
                                    <?php echo e($settingData->email); ?>

                                </a>
                            </p>

                            <p style="margin: 5px 0;">
                                Phone:
                                <a href="tel:+<?php echo e($settingData->whatsApp); ?>" style="color: #2c3e50;">
                                    +<?php echo e($settingData->whatsApp); ?>

                                </a>
                            </p>

                            <p style="margin: 5px 0;">Address: <?php echo e($settingData->address); ?></p>
                            <p style="margin-top: 10px;">&copy; <?php echo e(date('Y')); ?> Moon Nest. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
<?php /**PATH D:\Server\htdocs\CHL_Realstate\api\resources\views/emails/bulk_email.blade.php ENDPATH**/ ?>