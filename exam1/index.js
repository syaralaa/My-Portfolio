// 스크롤 트리거 플러그인 활성화
gsap.registerPlugin(ScrollTrigger);

console.clear();

var $window = $(window);
var windowWidth = $window.width();
var windowHeight = $window.height();

$window.resize(function () {
  windowWidth = $(window).width();
  windowHeight = $window.height();
});

function setTimelineToEl(timeline, $el) {
  $el.data('gsap-timeline', timeline);
}

function killTimeline($el) {
  var timeline = $el.data('gsap-timeline');
  
  if ( timeline ) {
    timeline.kill();
  }
}

function SectionTop__init() {
  var wrapMarginRight = 100;
  var $contentLi = $(".section-top__content > li");
  var $bgLi = $(".section-top__bg > li");
  var $bgLiChild = $bgLi.find(" > div");

  // 애니메이션 펼쳐지는 기간
  var animationDuration = 600;

  var updateBgLiChildWidth = function () {
    var width = windowWidth - wrapMarginRight;
    $bgLiChild.stop().width(width);
  };

  $window.resize(function () {
    updateBgLiChildWidth();
  });
  updateBgLiChildWidth();

  $contentLi.mouseenter(function () {
    var $this = $(this);
    var index = $this.index();
    var $selectedBgLi = $bgLi.eq(index);
    var $selectedBgLiChild = $bgLiChild.eq(index);

    $selectedBgLi.addClass("active");

    var timeline = gsap.timeline();
    
    setTimelineToEl(timeline, $selectedBgLiChild);
    setTimelineToEl(timeline, $selectedBgLi);
    
    var animationDurationSeconds = animationDuration / 1000;

    timeline.to($selectedBgLiChild, {
      left: 0,
      duration:animationDurationSeconds
    });
    
    timeline.to($selectedBgLi, {
      left: 0,
      right:0,
      duration:animationDurationSeconds
    }, "-=" + animationDurationSeconds);

  });

  $contentLi.mouseleave(function () {
    var $this = $(this);
    var index = $this.index();
    var $selectedBgLi = $bgLi.eq(index);
    var $selectedBgLiChild = $bgLiChild.eq(index);

    $selectedBgLi.removeClass("active");

    killTimeline($selectedBgLi);
    $selectedBgLi.css({
      left: "",
      right: ""
    });

    killTimeline($selectedBgLiChild);
    $selectedBgLiChild.css(
      {
        left: ""
      }
    );
  });
}

SectionTop__init();
