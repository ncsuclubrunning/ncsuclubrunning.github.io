---
layout: default
title: "Form submitted"
id: "contact-us"
---

<?php

?>

<h2>Thank you for your feedback.</h2>

<p>Click <a href="{{ site.baseurl }}/contact-us/">here</a> to return to the contact page, or click <a href="{{ site.baseurl }}/">here</a> to return to the homepage.</p>

<?php
    $name = $_POST['name'];
    $from = $_POST['from'];
    $message = $_POST['message'];

    $to = '{{ site.email }}';
    $subject = 'Message received from website feedback form';
    $email = "";

    if (!empty($name)) {
        $email .= "The following message was received from $name via the club website's feedback form: \n\n";
    } else {
        $email .= "The following message was received via the club website's feedback form:\n\n";
    }

    $email .= $message;

    if (!empty($from)) {
        mail($to, $subject, $message, 'From:' . $from);
    } else {
        mail($to, $subject, $message);
    }
?>
