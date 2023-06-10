// MODULES
import React from 'react';
import cn from 'classnames';

// CONTEXT
import { Context } from '../../context';

// STYLES
import style from './style.module.css';

class Toaster extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      toasts: [],
      toasts_clear_timer_id: 0,
    };

    // functions
    this.clear = this.clear.bind(this);
    this.update = this.update.bind(this);

    // html element references
    this.ref_toaster = React.createRef();
  }

  // Clears all the toasts after some time on update
  clear() {
    const toaster_div = this.ref_toaster.current;

    if (toaster_div.children.length === 0) {
      return;
    }

    for (let i = 0; i < toaster_div.children.length; i++) {
      toaster_div.children[i].classList.add(style['toaster-toastfade']);
    }

    setTimeout(() => {
      this.context.set_state({
        ...this.context.state,
        ui_toasts: [],
      });
    }, 1000);
  }

  // On new toast in context state
  update() {
    // toasts_global is a pointer to global context ui toasts
    const toasts_global = this.context.state.ui_toasts;
    const toaster_div = this.ref_toaster.current;

    // Check created_at prop for sorting by date
    for (let i = 0; i < toasts_global.length; i++) {
      if (
        !toasts_global[i].created_at ||
        !toasts_global[i].created_at.valueOf()
      ) {
        throw new Error('created_at prop does not provided in a toast');
      }
    }

    // return if global toasts synced with local toasts
    if (toasts_global.length === this.state.toasts.length) {
      return;
    }

    // Sort final toasts by date, we want the newest toaster to be on top
    for (let i = 0; i < toasts_global.length; i++) {
      for (let j = 0; j < toasts_global.length; j++) {
        if (toasts_global[j + 1]) {
          const current = toasts_global[j];
          const next = toasts_global[j + 1];

          if (current.created_at.valueOf() < next.created_at.valueOf()) {
            toasts_global[j] = next;
            toasts_global[j + 1] = current;
          }
        }
      }
    }

    // Remove all children of toaster
    const child_len = toaster_div.children.length;
    for (let i = 0; i < child_len; i++) {
      toaster_div.removeChild(toaster_div.children[0]);
    }

    // After removing all children, start creating new elements and place them into toaster container.
    for (let i = 0; i < toasts_global.length; i++) {
      // Left icon
      const icon_img = document.createElement('img');
      icon_img.classList.add(style['toaster-toast-left-icon']);

      const text_div = document.createElement('div');
      text_div.classList.add(style['toaster-toast-left-message']);
      text_div.innerHTML = toasts_global[i].message;

      const icon_text_ctr_div = document.createElement('div');
      icon_text_ctr_div.classList.add(style['toaster-toast-left']);

      const close_icon_img = document.createElement('img');
      close_icon_img.classList.add(style['toaster-toast-right']);
      close_icon_img.src = '/images/cross_white.png';
      close_icon_img.addEventListener('click', () => {
        const toasts_filtered = [];

        for (let j = 0; j < toasts_global.length; j++) {
          // because toasts_global is real reference to the global context ui toasts we can compare objects itself
          if (toasts_global[i] !== toasts_global[j]) {
            toasts_filtered.push(toasts_global[j]);
          }
        }

        this.context.set_state({
          ...this.context.state,
          ui_toasts: toasts_filtered,
        });
      });

      const toast_div = document.createElement('div');
      toast_div.classList.add(style['toaster-toast']);
      // for proper displaying on mobile
      toast_div.style.zIndex = toasts_global.length - i;

      // Give first one the slide animation, first one is the newest added toast. if global toasts are lower then local ones do not give animation because it means that user deleted one.
      if (i === 0 && toasts_global.length >= this.state.toasts.length) {
        toast_div.classList.add(style['toaster-toastani']);
      }

      switch (toasts_global[i].type) {
        case 'success':
          icon_img.src = '/images/tick_white.png';
          toast_div.classList.add(style['toaster-toastsuccess']);
          break;
        case 'error':
          icon_img.src = '/images/cross_white.png';
          toast_div.classList.add(style['toaster-toasterror']);
          break;
        case 'info':
          icon_img.src =
            'https://www.pinclipart.com/picdir/middle/333-3334785_png-transparent-info-icon-white-clipart.png';
          toast_div.classList.add(style['toaster-toastinfo']);
          break;
        case 'warning':
          icon_img.src =
            '384x384-warning-icon-png-white-11563228099gnhiaopzil.png';
          toast_div.classList.add(style['toaster-toastwarning']);
          break;
      }

      icon_text_ctr_div.appendChild(icon_img);
      icon_text_ctr_div.appendChild(text_div);

      toast_div.appendChild(icon_text_ctr_div);
      toast_div.appendChild(close_icon_img);

      toaster_div.appendChild(toast_div);
    }

    // Set toasts clear timeout after deleting the current on process
    clearTimeout(this.state.toasts_clear_timer_id);

    const toasts_clear_timer_id = setTimeout(() => {
      this.clear();
    }, 6000);

    this.setState({
      ...this.state,
      toasts: toasts_global,
      toasts_clear_timer_id: toasts_clear_timer_id,
    });
  }

  componentDidMount() {}

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {}

  render() {
    return <div ref={this.ref_toaster} className={cn(style['toaster'])}></div>;
  }
}

export default Toaster;
