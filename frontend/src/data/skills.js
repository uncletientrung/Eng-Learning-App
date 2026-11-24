import {
  Headphones,
  BookOpen,
  PenLine,
  Mic,
  BookMarked,
  GraduationCap,
} from 'lucide-react'

export const skills = [
  {
    id: 'listening',
    artwork: {
      background: ['#4e70c9', '#3453ad'],
      badge: '#3759b4',
      mascotOutline: 'M112 252 L130 252 L153 256 L167 261 L189 274 L208 295 L215 309 L219 327 L230 334 L236 347 L236 362 L233 369 L229 372 L234 408 L232 430 L130 430 L9 430 L8 424 L8 392 L12 372 L8 369 L5 362 L5 347 L11 334 L22 327 L26 309 L33 295 L51 275 L64 266 L85 257 Z',
    },
    title: 'Listening',
    description:
      'Luyện nghe mỗi ngày với 100+ đoạn hội thoại thực tế.',
    image: '/assets/listening-card.webp',
    icon: Headphones,
    path: '/listening',
    badge: '100+ ĐỀ',
    action: 'navigate',
  },
  {
    id: 'reading',
    artwork: {
      background: ['#32895c', '#27734b'],
      badge: '#608b42',
      mascotOutline: 'M146 241 L155 243 L161 249 L164 257 L163 268 L165 269 L171 262 L182 257 L196 256 L201 259 L197 269 L189 272 L166 272 L158 288 L183 303 L199 319 L201 324 L216 326 L225 334 L225 341 L218 340 L218 343 L228 347 L240 360 L240 430 L127 430 L0 430 L0 367 L14 353 L9 347 L11 338 L20 332 L34 330 L42 316 L55 303 L67 295 L92 285 L110 282 L128 282 L150 287 L153 281 L149 281 L149 279 L152 276 L156 277 L160 269 L155 270 L155 267 L146 261 L143 255 L143 244 Z M199 246 L197 244 L205 232 C194 228 187 214 195 212 C207 207 212 222 208 232 C218 225 236 224 239 228 C242 235 221 241 210 235 Z',
    },
    title: 'Reading',
    description:
      'Luyện đọc với hệ thống bài đọc IELTS đa dạng.',
    image: '/assets/reading-card.webp',
    icon: BookOpen,
    path: '/reading',
    badge: '100+ BÀI',
    action: 'navigate',
  },
  {
    id: 'writing',
    artwork: {
      background: ['#ce6675', '#b44d60'],
      badge: '#ad4357',
      mascotOutline: 'M114 244 L128 244 L147 248 L162 255 L178 268 L190 285 L195 297 L200 325 L205 337 L213 347 L229 360 L240 381 L240 430 L126 430 L0 430 L0 369 L5 357 L17 342 L30 335 L38 327 L42 320 L50 291 L65 267 L77 257 L92 249 Z',
    },
    title: 'Writing',
    description:
      'Luyện viết và cải thiện khả năng diễn đạt.',
    image: '/assets/writing-card.webp',
    icon: PenLine,
    path: '/writing',
    badge: '100+ BÀI',
    action: 'open-reading-modal',
  },
  {
    id: 'speaking',
    artwork: {
      background: ['#cf6c32', '#b55828'],
      badge: '#c4692d',
      mascotOutline: 'M115 258 L132 260 L140 266 L142 274 L147 274 L147 270 L156 265 L170 265 L180 269 L189 283 L188 294 L202 294 L211 300 L214 305 L214 318 L208 325 L210 327 L214 325 L220 330 L223 343 L230 350 L234 360 L232 382 L240 386 L240 430 L135 430 L0 430 L0 393 L6 387 L12 385 L15 369 L23 356 L35 345 L44 340 L50 340 L50 336 L46 336 L44 332 L45 321 L53 313 L65 310 L64 307 L61 307 L60 303 L61 293 L65 286 L76 279 L93 280 L97 268 L104 262 Z',
    },
    title: 'Speaking',
    description:
      'Luyện nói và cải thiện khả năng giao tiếp.',
    image: '/assets/speaking-card.webp',
    icon: Mic,
    path: '/speaking',
    badge: '100+ ĐỀ',
    action: 'navigate',
  },
  {
    id: 'vocabulary',
    artwork: {
      background: ['#54358e', '#44267c'],
      badge: '#43206e',
      mascotOutline: 'M134 270 L143 270 L153 274 L162 285 L163 295 L181 295 L193 306 L194 320 L187 331 L195 332 L200 338 L201 346 L196 346 L195 350 L202 351 L211 357 L222 368 L228 379 L230 385 L229 407 L232 412 L232 423 L229 430 L98 430 L12 430 L9 423 L9 412 L14 404 L12 395 L13 381 L20 366 L30 356 L41 349 L49 347 L48 345 L43 346 L42 339 L48 330 L51 328 L56 329 L56 325 L53 325 L50 320 L50 308 L58 298 L65 295 L76 295 L78 284 L89 274 L97 272 L107 273 L112 275 L115 281 L119 281 L125 273 Z',
    },
    title: 'Vocabulary',
    description:
      'Xây dựng vốn từ vựng IELTS hiệu quả.',
    image: '/assets/vocabulary-card.webp',
    icon: BookMarked,
    path: '/vocabulary/dashboard',
    badge: 'FREE',
    action: 'navigate',
  },
  {
    id: 'grammar',
    artwork: {
      background: ['#439b98', '#318581'],
      badge: '#2d7e7c',
      mascotOutline: 'M40 273 L59 275 L67 279 L74 287 L60 293 L45 305 L34 320 L32 328 L36 328 L44 313 L63 296 L79 288 L96 283 L125 281 L148 285 L172 296 L193 314 L201 326 L204 335 L206 335 L208 331 L198 313 L185 300 L169 291 L176 284 L185 280 L203 279 L222 287 L232 300 L234 309 L233 319 L223 333 L215 338 L206 340 L206 342 L207 346 L214 349 L225 359 L238 382 L240 389 L240 430 L1 430 L0 383 L3 373 L15 352 L25 343 L32 340 L34 334 L23 329 L14 321 L9 310 L9 298 L13 289 L20 281 Z',
    },
    title: 'Grammar',
    description:
      'Nắm vững ngữ pháp tiếng Anh.',
    image: '/assets/grammar-card.webp',
    icon: GraduationCap,
    path: '/grammar',
    badge: 'FREE',
    action: 'navigate',
  },
]
