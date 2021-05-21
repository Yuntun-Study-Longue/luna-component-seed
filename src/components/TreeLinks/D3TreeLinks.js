import * as d3 from "d3";
const D3TreeLinks = {}

D3TreeLinks.create = (el, data, configuration = [
    { 
        name: 'A', 
        margin: { top: 30, right: 10, bottom: 30, left: 20 },
        width: 960,
    },
    {
        name: 'B', 
        margin: { top: 30, right: 10, bottom: 30, left: 20 + 960 },
        width: 960,
    }
]) => {
    // let margin = { top: 30, right: 10, bottom: 30, left: 20 };
    // let width = 960;
    configuration.forEach(({ name, margin, width }) => {

        let barHeight = 20;
        let barWidth = (width - margin.left - margin.right) * 0.8;
        let element = el;
    
        let i = 0, duration = 400, root;
        let diagonal = d3.linkHorizontal()
        .x((d) => { return d.y; })
        .y((d) => { return d.x; });

        // 加这一段我的图标可以拖拽缩放了
        let zoom = d3.zoom()
        .scaleExtent([0.01, 10])
        .on("zoom", () => { svg.attr("transform", () => d3.event.transform) });
    
        let svg = d3.select(element).append("svg")
          .attr("width", element.offsetWidth) //+ margin.left + margin.right)
          .attr('height', element.offsetHeight)
          .call(zoom)
          .on("dblclick.zoom", null) // 防止双击缩放
          .append('g')
          .attr('transform', "translate(" + margin.left + "," + margin.top + ")")

        // 自定义图形
        let arrow = svg.append("svg:defs")
          .selectAll("marker")
  
        arrow.data(["start-arrow"]).enter().append("svg:marker")
            .attr("id", d=>d)
            .attr('class', 'arrow')
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", -7)
            .attr("refY", 0)
            .attr("markerWidth", 10)
            .attr("markerHeight", 16)
            .attr("markerUnits", "userSpaceOnUse")
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,0L10,5L10,-5")
            .attr('fill', '#666');    
    
        arrow.data(["end-arrow"]).enter().append("svg:marker")
            .attr("id", d=>d)
            .attr('class', 'arrow')
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 17)
            .attr("refY", 0)
            .attr("markerWidth", 10)
            .attr("markerHeight", 16)
            .attr("markerUnits", "userSpaceOnUse")
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr('fill', '#666');

        // 这一段是对数据结构进行处理
        root = d3.hierarchy(data[name].nodes);
        root.x0 = 0;
        root.y0 = 0;
        // moveChildren(root);
        update(root);
    
        function update(source) {
            // Compute the flattened node list.
            let nodes = root.descendants();
    
            let height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);
    
            d3.select("svg").transition()
            .duration(duration)
            .attr("height", height);
    
            d3.select(self.frameElement).transition()
            .duration(duration)
            .style("height", height + "px");
    
            // Compute the "layout". TODO https://github.com/d3/d3-hierarchy/issues/67
            let index = -1;
            root.eachBefore(function (n) {
                n.x = ++index * (barHeight + 5);
                n.y = n.depth * 20;
            });
    
            // Update the nodes…
            let node = svg.selectAll(".node")
            .data(nodes, function (d) { return d.id || (d.id = ++i); });
    
            let nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .style("opacity", 0);
    
            // Enter any new nodes at the parent's previous position.
            nodeEnter.append("rect")
            .attr("y", -barHeight / 2)
            .attr("height", barHeight)
            .attr("width", barWidth)
            .style("fill", color)
            .on("click", click);
    
            nodeEnter.append("text")
            .attr("dy", 5)
            .attr("dx", 5.5)
            .text(function (d) { return d.data.name; });
    
            // Transition nodes to their new position.
            nodeEnter.transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
            .style("opacity", 1);
    
            node.transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })
            .style("opacity", 1)
            .select("rect")
            .style("fill", color);
    
             // Transition exiting nodes to the parent's new position.
            node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
            .style("opacity", 0)
            .remove();
    
            // Update the links…
            var link = svg.selectAll(".link")
            .data(root.links(), function (d) { return d.target.id; });
    
            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
            .attr("class", "link")
            .style('fill', 'none')
            .style('stroke', '#ccc')
            .style('stroke-width', '2px')
            .attr("d", function (d) {
                var o = { x: source.x0, y: source.y0 };
                return diagonal({ source: o, target: o });
            })
            .transition()
            .duration(duration)
            .attr("d", diagonal);
    
            // Transition links to their new position.
            link.transition()
            .duration(duration)
            .attr("d", diagonal);
    
            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
                var o = { x: source.x, y: source.y };
                return diagonal({ source: o, target: o });
            })
            .remove();
    
            // Stash the old positions for transition.
            root.each(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }
        // Toggle children on click.
        function click(d) {
            if (d.children) {
            d._children = d.children;
            d.children = null;
            } else {
            d.children = d._children;
            d._children = null;
            }
            update(d);
        }

        function color(d) {
            return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
        }

        function moveChildren(node) { // https://stackoverflow.com/questions/19423396/d3-js-how-to-make-all-the-nodes-collapsed-in-collapsible-indented-tree
            if (node.children) {
            node.children.forEach(function (c) { moveChildren(c); });
            node._children = node.children;
            node.children = null;
            }
        }
    })

    
}

D3TreeLinks.update = (el, data, configuration, chart) => {

}

D3TreeLinks.destroy = () => {

}

export default D3TreeLinks;