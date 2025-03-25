/**
 * lfit   默认值，等比缩放，缩放图限制为指定w与h的矩形内的最大图片。
 * mfit   等比缩放，缩放图为延伸出指定w与h的矩形框外的最小图片。
 * fill   将原图等比缩放为延伸出指定w与h的矩形框外的最小图片，之后将超出的部分进行居中裁剪。
 * pad    将原图缩放为指定w与h的矩形内的最大图片，之后使用指定颜色居中填充空白部分。
 * fixed  固定宽高，强制缩放。
 */
type ResizeMode = 'lfit' | 'mfit' | 'fill' | 'pad' | 'fixed'

/**
 * 修改图片链接参数用以加载不同尺寸的图片
 * @param {String} url 图片原始链接
 * @param {Number} width 目标宽度，<= 0 的值表示使用默认宽度
 * @param {Number} height 目标高度，<= 0 的值表示使用默认高度
 */
function resize(url: string, width: number = 0, height: number = 0, mode: ResizeMode = 'lfit') {
  const w = width > 0 ? `w_${width}` : ''
  const h = height > 0 ? `h_${height}` : ''
  return `${url}?x-oss-process=image/resize,${w},${h},m_${mode}`
}

export default {
  resize
}
