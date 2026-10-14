import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { projects } from '../data/projects';
test('project filtering, keyboard-accessible details, and resume fallback', async ({page})=>{
  await page.goto('/');
  await expect(page.getByRole('heading',{level:1})).toContainText('Software engineer');
  await page.getByRole('button',{name:'AI & RAG',exact:true}).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await page.getByRole('link',{name:'View details',exact:true}).click();
  await expect(page).toHaveURL(/projects\/securerag-qr/);
  await expect(page.getByRole('heading',{name:'Technical architecture'})).toBeVisible();
  await page.goto('/');
  await expect(page.locator('#resume')).toContainText(/Resume PDF will be available|Download resume/);
  const report = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(report.violations).toEqual([]);
});
test('theme persists and mobile navigation works', async ({page,isMobile})=>{
  await page.goto('/');
  await page.getByRole('button',{name:'Toggle light or dark theme'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  if(isMobile){
    await page.getByRole('button',{name:'Open navigation'}).click();
    await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button',{name:'Open navigation'})).toBeFocused();
    await page.getByRole('button',{name:'Open navigation'}).click();
    await page.getByRole('navigation').getByRole('link',{name:'Research'}).click();
    await expect(page).toHaveURL(/#research/);
    await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeHidden();
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  const report=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(report.violations).toEqual([]);
});
test('every case study, metadata route, and unknown URL resolves correctly', async ({request})=>{
  for(const p of projects){ const response=await request.get(`/projects/${p.slug}`);expect(response.status()).toBe(200);expect(await response.text()).toContain(p.name); }
  expect((await request.get('/robots.txt')).status()).toBe(200);
  expect((await request.get('/sitemap.xml')).status()).toBe(200);
  expect((await request.get('/does-not-exist')).status()).toBe(404);
});
test('reduced motion and real outbound links',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
  expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  for(const link of await page.locator('a[target="_blank"]').all()){await expect(link).toHaveAttribute('rel',/noopener/);await expect(link).toHaveAttribute('rel',/noreferrer/);}
  await expect(page.locator('#contact a[href="mailto:harshitjoshi1706@gmail.com"]').first()).toBeAttached();
});
