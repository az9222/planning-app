$(document).ready(function(){
    $("#projects").tabs();
    $("ul").sortable({axis: "x", containment:"#projects"}); 
    $("ol").sortable({axis: "y", containment:"#projects"});

    $("#addTab").button().click(function () {
        $("#add-tab-popup").dialog({width: 400, resizable: false, modal:true,
            buttons: {
                "Submit": function(){
                    var tabName = $("#new-tab-text").val();
                    $(`<li><a href=#${tabName}>${tabName}</a></li>`)
                    .appendTo("#main");
                        $(`<ol id=${tabName}>`).appendTo("#projects");
                        $("#projects").tabs("refresh");
                        var tabCount = $("#projects .ui-tabs-nav li").length//???ui.tabs.nav is length of tabs and its the count
                        $("#projects").tabs("option", "active", tabCount-1); //???? this makes it the current tab
                            $("#new-tab-text").val(""); 
                            $(this).dialog("close"); 
                },
                "Cancel": function(){
                    $("#new-tab-text").val(""); 
                    $(this).dialog("close"); //??? closes the dialog
                }
            }
        }) 
    })

    $("#addTask").button().click(function () {
        $("#add-task-popup").dialog({width: 400, resizable: false, modal:true,
        buttons: {
            "Submit": function(){
                var taskName = $("#add-task-text").val();
                var activeOL = $("#projects").tabs("option", "active");
                var orderedList = $("#projects").children("ol")[activeOL];
                $(`<li><input type="checkbox">${taskName}</li>`).appendTo(orderedList);
                $("#add-task-text").val("");
                $(this).dialog("close");
            },
            "Cancel": function(){
                $("#add-task-text").val("");
                $(this).dialog("close");
            }
        }});
    })
    $("#delete-task").click(function() {
        var items = $(":checked")
        items.closest('li').remove();
    })

    $("#deleteTab").click(function() {
        var active = $("#projects").tabs("option", "active"); //returns the index of tab
        $("#projects").children("ol")[active].remove(); //removes the actual content of the tabs
        $("#projects").children("ul").children("li")[active].remove(); //removes actual tab
        $("#projects").tabs().tabs("refresh");
    })
})

