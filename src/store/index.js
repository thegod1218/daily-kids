import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import dayjs from 'dayjs'

// ── 인증 스토어 ──────────────────────────────────────────
export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  clear: () => set({ user: null, session: null, loading: false })
}))

// ── 앱 데이터 스토어 (localStorage 영속) ─────────────────
export const useAppStore = create(
  persist(
    (set, get) => ({
      // 프로필
      childName: '우리아이',
      childAge: 8,
      childAvatar: 'chick',
      parentName: '',
      familyCode: '',
      pin: '1234',
      appMode: 'child', // 'child' | 'parent'

      // 게임화
      points: 0,
      xp: 0,
      level: 1,
      streak: 0,
      lastCheckDate: '',
      todayChecked: false,

      // 미션
      missions: [
        { id: 'm1', icon: 'toothbrush', color: '#7F77DD', title: '아침 양치', pts: 10, xp: 20, time: 'am', done: false, needApproval: false },
        { id: 'm2', icon: 'droplet',    color: '#378ADD', title: '물 200ml',  pts: 5,  xp: 10, time: 'am', done: false, needApproval: false },
        { id: 'm3', icon: 'sun',        color: '#BA7517', title: '아침 식사', pts: 10, xp: 20, time: 'am', done: false, needApproval: false },
        { id: 'm4', icon: 'book',       color: '#1D9E75', title: '독서 30분', pts: 20, xp: 40, time: 'pm', done: false, needApproval: false },
        { id: 'm5', icon: 'pencil',     color: '#D85A30', title: '숙제하기',  pts: 15, xp: 30, time: 'pm', done: false, needApproval: false },
        { id: 'm6', icon: 'tools',      color: '#639922', title: '방 정리',   pts: 10, xp: 20, time: 'pm', done: false, needApproval: true  },
        { id: 'm7', icon: 'toothbrush', color: '#7F77DD', title: '저녁 양치', pts: 10, xp: 20, time: 'ev', done: false, needApproval: false },
        { id: 'm8', icon: 'moon',       color: '#534AB7', title: '일찍 자기', pts: 15, xp: 30, time: 'ev', done: false, needApproval: true  },
      ],
      lastMissionDate: '',
      pendingMissions: [], // 부모 승인 대기

      // 용돈/저금통
      moneyLogs: [],
      piggies: [],

      // 독서
      books: [],
      pendingBooks: [], // 독후감 검수 대기

      // 감정
      moodLogs: [], // [{ date, type }]

      // GPS 장소
      places: [],
      gpsLogs: [
        { id: 'g1', text: '수학학원 도착', time: '오늘 오후 4:02', type: 'arrive' },
        { id: 'g2', text: '수학학원 출발', time: '오늘 오후 6:15', type: 'depart' }
      ],

      // ── 액션 ────────────────────────────────────────────

      setProfile: (data) => set(data),

      setMode: (mode) => set({ appMode: mode }),

      // 포인트/XP 추가 (레벨업 자동 계산)
      addPoints: (pts, xpAmt) => {
        const s = get()
        let newPts = s.points + pts
        let newXp = s.xp + xpAmt
        let newLv = s.level
        while (newXp >= newLv * 200) {
          newXp -= newLv * 200
          newLv++
        }
        set({ points: Math.max(0, newPts), xp: newXp, level: newLv })
        return newLv > s.level // 레벨업 여부 반환
      },

      // 출석 체크
      checkIn: () => {
        const today = dayjs().format('YYYY-MM-DD')
        const s = get()
        if (s.todayChecked && s.lastCheckDate === today) return false
        const newStreak = s.lastCheckDate === dayjs().subtract(1, 'day').format('YYYY-MM-DD')
          ? s.streak + 1 : 1
        set({ todayChecked: true, lastCheckDate: today, streak: newStreak })
        get().addPoints(5, 10)
        return true
      },

      // 날짜 초기화 체크 (앱 시작시 호출)
      checkDailyReset: () => {
        const today = dayjs().format('YYYY-MM-DD')
        const s = get()
        if (s.lastMissionDate !== today) {
          set({
            missions: s.missions.map(m => ({ ...m, done: false })),
            todayChecked: false,
            lastMissionDate: today
          })
        }
      },

      // 미션 완료 처리
      completeMission: (id) => {
        const s = get()
        const mission = s.missions.find(m => m.id === id)
        if (!mission || mission.done) return

        const updatedMissions = s.missions.map(m =>
          m.id === id ? { ...m, done: true } : m
        )
        set({ missions: updatedMissions })

        if (mission.needApproval) {
          set({
            pendingMissions: [...s.pendingMissions, {
              id: 'pd_' + Date.now(),
              missionId: id,
              title: mission.title,
              icon: mission.icon,
              color: mission.color,
              pts: mission.pts,
              xp: mission.xp,
              createdAt: new Date().toISOString()
            }]
          })
        } else {
          get().addPoints(mission.pts, mission.xp)
        }
      },

      // 부모가 미션 승인
      approveMission: (pendingId) => {
        const s = get()
        const pending = s.pendingMissions.find(p => p.id === pendingId)
        if (!pending) return
        set({ pendingMissions: s.pendingMissions.filter(p => p.id !== pendingId) })
        get().addPoints(pending.pts, pending.xp)
      },

      // 미션 추가
      addMission: (mission) => {
        const s = get()
        set({
          missions: [...s.missions, {
            id: 'm_' + Date.now(),
            ...mission,
            done: false
          }]
        })
      },

      // 감정 기록
      logMood: (type, note = '') => {
        const today = dayjs().format('YYYY-MM-DD')
        const s = get()
        const filtered = s.moodLogs.filter(m => m.date !== today)
        set({ moodLogs: [{ date: today, type, note }, ...filtered] })
      },

      // 용돈 내역 추가
      addMoneyLog: (log) => {
        const s = get()
        const newLog = { id: 'ml_' + Date.now(), ...log, date: dayjs().format('MM/DD') }
        set({ moneyLogs: [newLog, ...s.moneyLogs] })

        // 저금통 연결 처리
        if (log.type === 'income' && log.piggyId) {
          const updatedPiggies = s.piggies.map(p => {
            if (p.id === log.piggyId) {
              const newAmount = Math.min(p.current + log.amount, p.target)
              return { ...p, current: newAmount }
            }
            return p
          })
          set({ piggies: updatedPiggies })
        }
      },

      // 저금통 추가
      addPiggy: (piggy) => {
        const s = get()
        set({ piggies: [...s.piggies, { id: 'pg_' + Date.now(), current: 0, ...piggy }] })
      },

      // 책 추가
      addBook: (book) => {
        const s = get()
        set({
          books: [...s.books, {
            id: 'bk_' + Date.now(),
            ...book,
            status: 'reading',
            review: '',
            parentComment: '',
            createdAt: new Date().toISOString()
          }]
        })
      },

      // 독후감 제출
      submitReview: (bookId, review) => {
        const s = get()
        set({
          books: s.books.map(b =>
            b.id === bookId ? { ...b, review, status: 'pendingReview' } : b
          ),
          pendingBooks: [...s.pendingBooks, { bookId, reviewedAt: new Date().toISOString() }]
        })
      },

      // 독후감 승인
      approveReview: (bookId, comment) => {
        const s = get()
        set({
          books: s.books.map(b =>
            b.id === bookId ? { ...b, status: 'approved', parentComment: comment || '잘 썼어!' } : b
          ),
          pendingBooks: s.pendingBooks.filter(p => p.bookId !== bookId)
        })
        get().addPoints(30, 60)
      },

      // 독후감 반려
      rejectReview: (bookId) => {
        const s = get()
        set({
          books: s.books.map(b =>
            b.id === bookId ? { ...b, status: 'rejected' } : b
          ),
          pendingBooks: s.pendingBooks.filter(p => p.bookId !== bookId)
        })
      },

      // GPS 장소 추가
      addPlace: (place) => {
        const s = get()
        const newPlace = { id: 'pl_' + Date.now(), ...place }
        set({
          places: [...s.places, newPlace],
          gpsLogs: [
            { id: 'gl_' + Date.now(), text: place.name + ' 등록됨', time: '방금 전', type: 'arrive' },
            ...s.gpsLogs
          ]
        })
      }
    }),
    {
      name: 'daily-kids-store',
      partialize: (state) => ({
        childName: state.childName,
        childAge: state.childAge,
        childAvatar: state.childAvatar,
        parentName: state.parentName,
        familyCode: state.familyCode,
        pin: state.pin,
        points: state.points,
        xp: state.xp,
        level: state.level,
        streak: state.streak,
        lastCheckDate: state.lastCheckDate,
        todayChecked: state.todayChecked,
        missions: state.missions,
        lastMissionDate: state.lastMissionDate,
        pendingMissions: state.pendingMissions,
        moneyLogs: state.moneyLogs,
        piggies: state.piggies,
        books: state.books,
        pendingBooks: state.pendingBooks,
        moodLogs: state.moodLogs,
        places: state.places,
        gpsLogs: state.gpsLogs
      })
    }
  )
)
