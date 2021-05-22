import React, { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export default function LineChart({ data, x, y, axisAngle }) {
  const chartRef = useRef();
  useEffect(() => {
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_dataviz);
    // Themes end

    // Create chart instance
    let chart = am4core.create(chartRef.current, am4charts.XYChart);
    chart.paddingRight = 20;

    // Add data
    chart.data = data;

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = x;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;
    categoryAxis.renderer.labels.template.rotation = axisAngle || 90;

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = y;
    series.dataFields.categoryX = x;
    series.strokeWidth = 2;
    series.tensionX = 0.77;

    // bullet is added because we add tooltip to a bullet for it to change color
    let bullet = series.bullets.push(new am4charts.Bullet());
    bullet.tooltipText = "{valueY}";

    bullet.adapter.add("fill", function (fill, target) {
      if (target.dataItem.valueY < 0) {
        return am4core.color("#FF0000");
      }
      return fill;
    });
    // let range = valueAxis.createSeriesRange(series);
    // range.value = 0;
    // range.endValue = -1000;
    // range.contents.stroke = am4core.color("#FF0000");
    // range.contents.fill = range.contents.stroke;

    // // Add scrollbar
    // let scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    chart.cursor = new am4charts.XYCursor();
  }, []);
  return <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>;
}
