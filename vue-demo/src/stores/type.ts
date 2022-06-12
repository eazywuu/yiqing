export interface ShowAddSwitch {
  confirm: boolean
  suspect: boolean
  nowConfirm: boolean
  importedCase: boolean
  all: boolean
  heal: boolean
  nowSevere: boolean
  noInfect: boolean
  localConfirm: boolean
  localinfeciton: boolean
  dead: boolean
}

export interface Today {
  confirm: number
  isUpdated: boolean
}

export interface Total {
  nowConfirm: number
  showRate: boolean
  showHeal: boolean
  provinceLocalConfirm: number
  wzz: number
  adcode: string
  heal: number
  mediumRiskAreaNum: number
  mtime: string
  confirm: number
  dead: number
  highRiskAreaNum: number
  continueDayZeroLocalConfirmAdd: number
  continueDayZeroLocalConfirm: number
}

export interface Today {
  isUpdated: boolean
  tip: string
  wzz_add: number
  local_confirm_add: number
  abroad_confirm_add: number
  dead_add: number
  confirm: number
  confirmCuts: number
}

export interface Total {
  heal: number
  showHeal: boolean
  provinceLocalConfirm: number
  highRiskAreaNum: number
  continueDayZeroConfirm: number
  continueDayZeroLocalConfirmAdd: number
  mtime: string
  adcode: string
  nowConfirm: number
  confirm: number
  dead: number
  wzz: number
  continueDayZeroConfirmAdd: number
  showRate: boolean
  mediumRiskAreaNum: number
}

export interface Today {
  confirm: number
  confirmCuts: number
  isUpdated: boolean
  wzz_add: number
  local_confirm_add: number
}

export interface Total {
  dead: number
  continueDayZeroLocalConfirmAdd: number
  showRate: boolean
  provinceLocalConfirm: number
  highRiskAreaNum: number
  adcode: string
  nowConfirm: number
  confirm: number
  showHeal: boolean
  wzz: number
  heal: number
  mediumRiskAreaNum: number
  continueDayZeroLocalConfirm: number
  mtime: string
}

export interface Children {
  name: string
  adcode: string
  date: string
  today: Today
  total: Total
}

export interface Children {
  today: Today
  total: Total
  children: Children[]
  name: string
  adcode: string
  date: string
}

export interface AreaTree {
  name: string
  today: Today
  total: Total
  children: Children[]
}

export interface ChinaTotal {
  dead: number
  importedCase: number
  localWzzAdd: number
  confirmAdd: number
  mtime: string
  mediumRiskAreaNum: number
  nowConfirm: number
  localConfirm: number
  noInfect: number
  noInfectH5: number
  nowLocalWzz: number
  confirm: number
  heal: number
  nowSevere: number
  localConfirmH5: number
  local_acc_confirm: number
  deadAdd: number
  localConfirmAdd: number
  highRiskAreaNum: number
  suspect: number
  showLocalConfirm: number
  showlocalinfeciton: number
  mRiskTime: string
}

export interface ChinaAdd {
  confirm: number
  heal: number
  dead: number
  suspect: number
  noInfectH5: number
  nowConfirm: number
  nowSevere: number
  importedCase: number
  noInfect: number
  localConfirm: number
  localConfirmH5: number
}

export interface Diseaseh5Shelf {
  showAddSwitch: ShowAddSwitch
  areaTree: AreaTree[]
  lastUpdateTime: string
  chinaTotal: ChinaTotal
  chinaAdd: ChinaAdd
  isShowAdd: boolean
}

export interface LocalCityNCOVDataList {
  mtime: string
  isSpecialCity: boolean
  city: string
  adcode: string
  date: string
  isUpdated: boolean
  local_confirm_add: number
  local_wzz_add: string
  mediumRiskAreaNum: number
  highRiskAreaNum: number
  province: string
}

export interface RootObject {
  diseaseh5Shelf: Diseaseh5Shelf
  localCityNCOVDataList: LocalCityNCOVDataList[]
}
