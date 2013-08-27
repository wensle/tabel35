<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Tabel35</title>

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
        <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
        });
        </script>
        <script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <?php include_once('db.php'); ?>
        
     
			<h1>Test Formules</h1>

            <?php include_once('functiesPHP.php') ?>
            <h2>Klikbaar, uit de database, met functies:</h2>
            <?php $arrSymboolGrootheid = getArrSymboolGrootheid(); ?>
            <h2>getFormule, grootheid_id = 1</h2>
            <?php getFormule(1, $arrSymboolGrootheid); ?>
            <h2>getFormule, grootheid_id = 2</h2>
            <?php //getFormule(2, $arrSymboolGrootheid); ?>
            <h2> getFormule, grootheid_id = 4</h2>
            <?php //getFormule(4, $arrSymboolGrootheid); ?>

<button type="button" id="testButton">TEST AJAX</button>

   <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
        <script src="js/formula_obtainment.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
        <script>
			$.ajaxSetup ({
				cache: false
				});
        </script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src='//www.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>
