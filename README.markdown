# MicroTemplates

MicroTemplates is a super simple templating library written by John Resig of jQuery fame.  This is a port to be used with server-side javascripts like node.js. The library exports a single function called "`tmpl`" that compiles a template and optionally executes it or returns a function that can be reused.

## Syntax

Basically the syntax is pure HTML with embedded javascript code.  You can use `<%...%>` for raw code insertion and `<%=...%>` for expressions that you want interpolated.

Assume you have a file called "`item.tmpl`" containing the following:

    <div id="<%=id%>" class="<%=(i % 2 == 1 ? " even" : "")%>">
      <div class="grid_1 alpha right">
        <img class="righted" src="<%=profile_image_url%>"/>
      </div>
      <div class="grid_6 omega contents">
        <p><b><a href="/<%=from_user%>"><%=from_user%></a>:</b> <%=text%></p>
      </div>
    </div>

Also you have another file called "`users.tmpl`" with the following:

    <% for (var i = 0, l = users.length; i < l; i++) { %>
      <li><a href="<%= users[i].url %>"><%= users[i].name %></a></li>
    <% } %>

Notice that you can inline javascript for your logic.

## Usage

Then the code (in node.JS) to render the "`item.tmpl`" template could look like this:

    var fs = require('fs'),     // Load node's file system library
        tmpl = require('tmpl'); // Load this library (assuming it's installed)
    
    var code = fs.readFileSync("item.tmpl");
    var show_user = tmpl(code);
    var html = "";
    for (var i = 0, l = users.length; i < l; i++) {
      html += show_user(users[i]);
    }


Also you could execute a template immediately instead of caching the compiled template:

    var fs = require('fs'),     // Load node's file system library
        tmpl = require('tmpl'); // Load this library (assuming it's installed)
    
    var code = fs.readFileSync("users.tmpl");
    var html = tmpl(fs.readFileSync(code), users);
