print qq{<!DOCTYPE html">
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Bibliofilo - RACHEL</title>
    <style>
        body { background-color: #ddd; font-family: sans-serif; }
        ul { margin: 20px 0 20px 0; list-style: none; }
        .s { font-size: small; }
    </style>
</head>
<body>
<h1>Biblioteca Filosofico-Politica</h1>
<p>Excelente colección de materiales filosofico-politica para América Latina.</p>
<ul>
};
my $base = "content";
foreach my $dir (sort `ls $base`) {
    chomp $dir;
    if (not -d "$base/$dir") {
        warn "Skipping $base/$dir\n";
    }
    print "<li class='s'>$dir</li>\n";
    print "<ul>\n";
    my $count = 0;
    $urldir = $dir;
    $urldir =~ s/^#/%23/g;
    foreach my $name (`ls '$base/$dir'`) {
        ++$count;
        chomp $name;
        print "<li><a href='$base/$urldir/$name'>$name</a></li>\n";
    }
    if (not $count) {
        warn "No results: ls '$base/$dir'\n";
    }
    print "</ul>\n";
}

print qq{
</ul>
</body>
</html>
};

