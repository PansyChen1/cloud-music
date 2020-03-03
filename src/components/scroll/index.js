import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle
} from "react";
import BScroll from 'better-scroll';
import PropTypes from "prop-types";
import styled from "styled-components";

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState();

  //current 指向初始化 bs 实例需要的 DOM 元素
  const scrollContaninerRef = useRef();

  const {
    direction,
    click,
    refresh,
    pullUploading,
    pullDownLoading,
    bounceTop,
    bounceBottom
  } = props;
  const {pullUp, pullDown, onScroll} = props;

  useEffect(() => {
    //创建 better-scroll
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null)
    }
  }, [])

  //重新渲染时刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  }, []);

  //给实例绑定onscroll事件
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", (scroll) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off('scroll');
    }
  }, [onScroll, bScroll])

  //进行上拉到底的判断，调用上拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on("scrollEnd", () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    }
  }, [pullUp, bScroll])

  //进行下拉的判断，调用下拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on("touchEnd", (pos) => {
      //判断用户的下拉动作
      if (pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    }
  }, [pullDown, bScroll]);

  // 一般和 forwardRef 一起使用，ref 已经在 forwardRef 中默认传入
  useImperativeHandle(ref, () => ({
    // 给外界暴露 refresh 方法
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));


  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
    </ScrollContainer>
  )

});
Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,//上拉加载逻辑
  pullDown: PropTypes.func,//下拉加载逻辑
  pullUpLoading: PropTypes.bool,//是否显示上拉loading动画
  pullDownLoading: PropTypes.bool,//是否显示下拉loading动画
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向上吸顶
};

export default Scroll