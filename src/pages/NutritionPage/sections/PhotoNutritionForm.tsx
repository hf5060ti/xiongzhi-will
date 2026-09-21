import { useEffect, useState, type ChangeEvent } from 'react';
import { Camera, ScanText } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Image } from '@/components/ui/image';

interface PhotoValues {
  energy: string;
  protein: string;
  fat: string;
  carb: string;
  sodium: string;
  fiber: string;
}

const EMPTY_VALUES: PhotoValues = {
  energy: '',
  protein: '',
  fat: '',
  carb: '',
  sodium: '',
  fiber: '',
};

const ENERGY_RE = [
  /(?:能量|热量|卡路里)[\s\S]{0,15}?(\d+(?:\.\d+)?)/,
  /(?:ENERGY|CALORIES?)[\s\S]{0,15}?(\d+(?:\.\d+)?)/i,
];
const PROTEIN_RE = [
  /(?:蛋白质|蛋白)[\s\S]{0,12}?(\d+(?:\.\d+)?)/,
  /PROTEIN[\s\S]{0,12}?(\d+(?:\.\d+)?)/i,
];
const FAT_RE = [/(?:脂肪)[\s\S]{0,12}?(\d+(?:\.\d+)?)/, /FAT[\s\S]{0,12}?(\d+(?:\.\d+)?)/i];
const CARB_RE = [
  /(?:碳水化合物|碳水)[\s\S]{0,14}?(\d+(?:\.\d+)?)/,
  /CARBOHYDRATES?[\s\S]{0,12}?(\d+(?:\.\d+)?)/i,
];
const SODIUM_RE = [/(?:钠)[\s\S]{0,12}?(\d+(?:\.\d+)?)/, /SODIUM[\s\S]{0,12}?(\d+(?:\.\d+)?)/i];
const FIBER_RE = [
  /(?:膳食纤维|纤维)[\s\S]{0,14}?(\d+(?:\.\d+)?)/,
  /FIBER[\s\S]{0,12}?(\d+(?:\.\d+)?)/i,
];

function extractNumber(text: string, patterns: RegExp[]): string {
  for (const re of patterns) {
    const m = text.match(re);
    if (m && m[1]) return m[1].trim();
  }
  return '';
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

type OcrState = 'idle' | 'working' | 'done' | 'error';

export default function PhotoNutritionForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [ocrState, setOcrState] = useState<OcrState>('idle');
  const [progress, setProgress] = useState(0);
  const [ocrText, setOcrText] = useState('');
  const [values, setValues] = useState<PhotoValues>(EMPTY_VALUES);
  const [baseGrams, setBaseGrams] = useState('100');
  const [actualGrams, setActualGrams] = useState('');

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(f));
    setOcrState('idle');
    setProgress(0);
    setOcrText('');
    setValues(EMPTY_VALUES);
  };

  const handleRecognize = async () => {
    if (!file) return;
    setOcrState('working');
    setProgress(0);
    try {
      const worker = await createWorker('chi_sim+eng', 1, {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });
      const { data } = await worker.recognize(file);
      await worker.terminate();
      const text = data.text || '';
      setOcrText(text);
      setValues({
        energy: extractNumber(text, ENERGY_RE),
        protein: extractNumber(text, PROTEIN_RE),
        fat: extractNumber(text, FAT_RE),
        carb: extractNumber(text, CARB_RE),
        sodium: extractNumber(text, SODIUM_RE),
        fiber: extractNumber(text, FIBER_RE),
      });
      setOcrState('done');
    } catch {
      setOcrState('error');
    }
  };

  const setField = (key: keyof PhotoValues) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const base = parseFloat(baseGrams);
  const actual = parseFloat(actualGrams);
  const validBase = Number.isFinite(base) && base > 0;
  const validActual = Number.isFinite(actual) && actual > 0;
  const ratio = validBase && validActual ? actual / base : 0;
  const hasAnyValue = Object.values(values).some((v) => v.trim() !== '');

  const resultRows = [
    { label: '热量', value: values.energy ? `${round1(parseFloat(values.energy) * ratio)} kcal` : '—' },
    { label: '蛋白质', value: values.protein ? `${round1(parseFloat(values.protein) * ratio)} g` : '—' },
    { label: '脂肪', value: values.fat ? `${round1(parseFloat(values.fat) * ratio)} g` : '—' },
    { label: '碳水化合物', value: values.carb ? `${round1(parseFloat(values.carb) * ratio)} g` : '—' },
    { label: '膳食纤维', value: values.fiber ? `${round1(parseFloat(values.fiber) * ratio)} g` : '—' },
    { label: '钠', value: values.sodium ? `${round1(parseFloat(values.sodium) * ratio)} mg` : '—' },
  ];

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center transition-colors hover:border-primary/50 hover:bg-accent">
            <Camera className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              拍照或选择营养表图片
            </span>
            <span className="text-xs text-muted-foreground">
              手机可直接调起相机，电脑选择图片文件
            </span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFile}
              className="hidden"
            />
          </label>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="营养表照片预览"
              className="h-auto max-h-72 w-full rounded-lg border border-border object-contain"
            />
          ) : null}
        </div>

        <div className="space-y-3">
          {file ? (
            ocrState === 'working' ? (
              <div className="space-y-2 rounded-md border border-border bg-muted/40 p-4">
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ScanText className="h-4 w-4 text-primary" />
                  正在识别文字…{progress}%
                </p>
                <Progress value={progress} />
                <p className="text-xs text-muted-foreground">
                  首次识别需下载约 20MB 中文识别模型（免费开源，浏览器本地运行），之后有缓存。
                </p>
              </div>
            ) : (
              <Button onClick={handleRecognize} className="w-full">
                <ScanText className="mr-1.5 h-4 w-4" />
                {ocrState === 'error' ? '识别失败，重试' : ocrState === 'done' ? '重新识别' : '开始识别营养表'}
              </Button>
            )
          ) : null}

          {ocrState === 'done' && (
            <p className="rounded-md border border-success/30 bg-success/10 p-2.5 text-xs text-success">
              识别完成，下方数值已自动提取，请对照照片核对（识别可能有个别错字）。
            </p>
          )}
          {ocrState === 'error' && (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 p-2.5 text-xs text-destructive">
              识别失败：图片不清晰或模型未就绪。可重试，或直接手动填写下方数值。
            </p>
          )}

          {previewUrl && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">识别文本（可编辑）</label>
              <Textarea
                rows={5}
                value={ocrText}
                onChange={(e) => setOcrText(e.target.value)}
                placeholder="识别出的文字会出现在这里，可手动修改"
                className="text-xs"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <NumberField label="每100g 热量（kcal）" value={values.energy} onChange={setField('energy')} />
        <NumberField label="每100g 蛋白质（g）" value={values.protein} onChange={setField('protein')} />
        <NumberField label="每100g 脂肪（g）" value={values.fat} onChange={setField('fat')} />
        <NumberField label="每100g 碳水（g）" value={values.carb} onChange={setField('carb')} />
        <NumberField label="膳食纤维（g，可选）" value={values.fiber} onChange={setField('fiber')} />
        <NumberField label="钠（mg，可选）" value={values.sodium} onChange={setField('sodium')} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="base-grams" className="text-xs text-muted-foreground">
            营养表基准（g）：默认 100；若标注「每份 30g」请改为 30
          </label>
          <Input
            id="base-grams"
            type="number"
            min={1}
            value={baseGrams}
            onChange={(e) => setBaseGrams(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="actual-grams" className="text-xs text-muted-foreground">
            实际吃了多少（g）
          </label>
          <Input
            id="actual-grams"
            type="number"
            min={0}
            placeholder="如 40（一包薯片）"
            value={actualGrams}
            onChange={(e) => setActualGrams(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      {validActual && (hasAnyValue || ratio > 0) ? (
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">
            实际摄入（已按 {actual} / {validBase ? base : 100} 换算）
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {resultRows.map((row) => (
              <div key={row.label} className="rounded-md border border-border bg-muted/40 p-2.5 text-center">
                <p className="font-display text-base font-bold leading-none text-foreground">{row.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{row.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            结果基于你填写的数值按比例换算，仅供参考；包装数值以实物标注为准。
          </p>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          填写数值与实际克数后，这里会给出对应的热量与营养估算。
        </p>
      )}
    </div>
  );
}

interface NumberFieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function NumberField({ label, value, onChange }: NumberFieldProps) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <Input type="number" min={0} value={value} onChange={onChange} className="mt-1" />
    </div>
  );
}
