import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('開発基盤の確認画面を表示する', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '開発基盤の準備ができました' }),
    ).toBeInTheDocument()
  })

  it('プライバシーポリシーの仮画面を表示する', () => {
    render(
      <MemoryRouter initialEntries={['/privacy']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'プライバシーポリシー' }),
    ).toBeInTheDocument()
  })
})
