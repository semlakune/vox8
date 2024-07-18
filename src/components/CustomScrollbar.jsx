"use client";
import 'overlayscrollbars/overlayscrollbars.css';
import {
  OverlayScrollbars,
  ScrollbarsHidingPlugin,
  SizeObserverPlugin,
  ClickScrollPlugin
} from 'overlayscrollbars';
import {useEffect} from "react";

export default function CustomScrollbar() {
  useEffect(() => {
    OverlayScrollbars({ target: document.querySelector('body') }, {
      scrollbars: {
        autoHide: "scroll",
        autoHideDelay: 800,
        theme: "os-theme-light"
      }
    });
    OverlayScrollbars.plugin([ScrollbarsHidingPlugin, SizeObserverPlugin, ClickScrollPlugin])
  }, []);
  return null;
}